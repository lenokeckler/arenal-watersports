"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_MUTATION_STATUS } from "../constants/UnitMutationStatus.constants";
import type { CreateUnitInput } from "../models/CreateUnitInput.interface";
import type { UnitMutationResult } from "../models/UnitMutationResult.interface";
import { findUnitCodeError } from "../utils/findUnitCodeError";
import { findUnitInputError } from "../utils/findUnitInputError";
import { mapCreateUnitInputToRow } from "../utils/mapCreateUnitInputToRow";
import { mapUnitWriteErrorToResult } from "../utils/mapUnitWriteErrorToResult";

export const createUnitAction = async (
  input: CreateUnitInput
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
  const inputError = findUnitInputError(input);
  if (inputError) {
    return {
      status: UNIT_MUTATION_STATUS.ERROR,
      message: inputError,
    };
  }

  const { data: insertedUnitRow, error } = await supabase
    .from("equipment_units")
    .insert(
      mapCreateUnitInputToRow(
        { ...input, code: input.code.trim() },
        adminWorkerId
      )
    )
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
