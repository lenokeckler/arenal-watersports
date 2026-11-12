"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { DecommissionUnitInput } from "../models/DecommissionUnitInput.interface";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";
import { mapDecommissionUnitInputToRow } from "../utils/mapDecommissionUnitInputToRow";
import { mapUnitWriteErrorToResult } from "../utils/mapUnitWriteErrorToResult";
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
  const failure = mapUnitWriteErrorToResult(error);
  if (failure) {
    return failure;
  }
  throwIfSupabaseError(error, "decommissionUnitAction");

  return updatedUnitRow
    ? { status: UNIT_MUTATION_STATUS.SUCCESS }
    : buildErrorResult(
        UNIT_CATALOG_COPY.UNIT_NOT_EDITABLE_ERROR
      );
};
