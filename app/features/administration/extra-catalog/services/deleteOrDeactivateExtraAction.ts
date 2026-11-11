"use server";

import { SUPABASE_RPC } from "@/app/constants";
import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { EXTRA_MUTATION_STATUS } from "../constants/ExtraMutationStatus.constants";
import type { ExtraRemovalResult } from "../models/ExtraRemovalResult.type";
import { mapExtraWriteErrorToResult } from "../utils/mapExtraWriteErrorToResult";
import { parseExtraRemovalOutcome } from "../utils/parseExtraRemovalOutcome";

export const deleteOrDeactivateExtraAction = async (
  extraId: string
): Promise<ExtraRemovalResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const { data: returnedOutcome, error } =
    await supabase.rpc(
      SUPABASE_RPC.DELETE_OR_DEACTIVATE_EXTRA,
      { p_extra_id: extraId }
    );
  const failure = mapExtraWriteErrorToResult(error);
  if (failure?.message) {
    return {
      status: EXTRA_MUTATION_STATUS.ERROR,
      message: failure.message,
    };
  }
  throwIfSupabaseError(
    error,
    "deleteOrDeactivateExtraAction"
  );

  return {
    status: EXTRA_MUTATION_STATUS.SUCCESS,
    outcome: parseExtraRemovalOutcome(
      safeString(returnedOutcome)
    ),
  };
};
