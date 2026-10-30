"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_CATALOG_COPY } from "../constants/UnitCatalogCopy.constants";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import { UNIT_STATUS } from "../constants/UnitStatus.constants";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";
import type { UpdateUnitInput } from "../models/UpdateUnitInput.interface";
import { mapUnitWriteErrorToResult } from "../utils/mapUnitWriteErrorToResult";
import { findUnitCodeError } from "../utils/findUnitCodeError";
import { mapUpdateUnitInputToRow } from "../utils/mapUpdateUnitInputToRow";

export const updateUnitAction = async (
  input: UpdateUnitInput
): Promise<UnitMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);
  const codeError = findUnitCodeError(input.code);
  if (codeError) {
    return {
      status: UNIT_MUTATION_STATUS.ERROR,
      codeError,
    };
  }

  const { data: updatedUnitRow, error } = await supabase
    .from("equipment_units")
    .update(
      mapUpdateUnitInputToRow(
        { ...input, code: input.code.trim() },
        adminWorkerId
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
  throwIfSupabaseError(error, "updateUnitAction");

  if (!updatedUnitRow) {
    return {
      status: UNIT_MUTATION_STATUS.ERROR,
      message: UNIT_CATALOG_COPY.UNIT_NOT_EDITABLE_ERROR,
    };
  }

  return { status: UNIT_MUTATION_STATUS.SUCCESS };
};
