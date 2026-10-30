"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";
import { mapCreateUnitInputToRow } from "../utils/mapCreateUnitInputToRow";
import { mapUnitWriteErrorToResult } from "../utils/mapUnitWriteErrorToResult";

export const createUnitAction = async (
  input: CreateUnitInput
): Promise<UnitMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const { data: insertedUnitRow, error } = await supabase
    .from("equipment_units")
    .insert(mapCreateUnitInputToRow(input, adminWorkerId))
    .select("id")
    .single();
  const failure = mapUnitWriteErrorToResult(error);
  if (failure) {
    return failure;
  }
  throwIfSupabaseError(error, "createUnitAction");
  if (!insertedUnitRow) {
    throw new Error(
      "createUnitAction: insert returned no row"
    );
  }

  return {
    status: UNIT_MUTATION_STATUS.SUCCESS,
    unitId: insertedUnitRow.id,
  };
};
