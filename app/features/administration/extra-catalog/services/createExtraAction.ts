"use server";

import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { CreateExtraInput } from "../models/CreateExtraInput.interface";
import type { ExtraMutationResult } from "../models/ExtraMutationResult.interface";
import { mapExtraWriteErrorToResult } from "../utils/mapExtraWriteErrorToResult";
import { readExtraName } from "../utils/readExtraName";
import { validateExtraName } from "../utils/validateExtraName";

export const createExtraAction = async (
  input: CreateExtraInput
): Promise<ExtraMutationResult> => {
  const supabase = await createServerSupabaseClient();
  const adminWorkerId = await assertIsAdminWorker(supabase);

  const nameError = validateExtraName(readExtraName(input));
  if (nameError) {
    return {
      status: EXTRA_MUTATION_STATUS.ERROR,
      nameError,
    };
  }

  const { error } = await supabase.from("extras").insert({
    name: input.name.trim(),
    created_by: adminWorkerId,
    updated_by: adminWorkerId,
  });
  const failure = mapExtraWriteErrorToResult(error);
  if (failure) {
    return failure;
  }
  throwIfSupabaseError(error, "createExtraAction");

  return { status: EXTRA_MUTATION_STATUS.SUCCESS };
};
