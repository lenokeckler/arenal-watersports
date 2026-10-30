"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import {
  UNIT_EFFECTIVE_STATUS,
  UNIT_STATUS,
} from "../constants/UnitStatus.constants";
import type { DecommissionUnitInput } from "../models/DecommissionUnitInput.interface";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";
import { mapDecommissionUnitInputToRow } from "../utils/mapDecommissionUnitInputToRow";
import { validateUnitDecommissionReason } from "../utils/validateUnitDecommissionReason";

const buildErrorResult = (
  message: string
): UnitMutationResult => ({
  status: UNIT_MUTATION_STATUS.ERROR,
  message,
});

export const decommissionUnitAction = async (
  input: DecommissionUnitInput
): Promise<UnitMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const reasonError = validateUnitDecommissionReason(
    input.reason
  );
  if (reasonError) {
    return buildErrorResult(reasonError);
  }

  const { data: currentState, error: stateError } =
    await supabase
      .from("unit_current_state")
      .select("effective_status")
      .eq("id", input.unitId)
      .maybeSingle();
  throwIfSupabaseError(
    stateError,
    "decommissionUnitAction"
  );
  if (!currentState) {
    return buildErrorResult(
      UNIT_CATALOG_COPY.UNIT_NOT_EDITABLE_ERROR
    );
  }
  if (
    currentState.effective_status ===
    UNIT_EFFECTIVE_STATUS.OCCUPIED
  ) {
    return buildErrorResult(
      UNIT_CATALOG_COPY.DECOMMISSION_OCCUPIED_ERROR
    );
  }

  const { data: updatedUnitRow, error } = await supabase
    .from("equipment_units")
    .update(
      mapDecommissionUnitInputToRow(
        input,
        adminWorkerId,
        new Date()
      )
    )
    .eq("id", input.unitId)
    .neq("status", UNIT_STATUS.DECOMMISSIONED)
    .select("id")
    .maybeSingle();
  throwIfSupabaseError(error, "decommissionUnitAction");
  if (!updatedUnitRow) {
    return buildErrorResult(
      UNIT_CATALOG_COPY.UNIT_NOT_EDITABLE_ERROR
    );
  }

  return { status: UNIT_MUTATION_STATUS.SUCCESS };
};
