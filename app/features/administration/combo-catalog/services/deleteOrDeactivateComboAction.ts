"use server";

import { STATUS, SUPABASE_RPC } from "@/app/constants";
import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { COMBO_REMOVAL_OUTCOME_COPY } from "../constants/ComboRemovalOutcomeCopy.constants";
import type { ComboActionResult } from "../models/ComboActionResult.interface";
import { mapComboWriteErrorToMessage } from "../utils/mapComboWriteErrorToMessage";
import { parseComboRemovalOutcome } from "../utils/parseComboRemovalOutcome";

export const deleteOrDeactivateComboAction = async (
  comboId: string
): Promise<ComboActionResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const { data: returnedOutcome, error } =
    await supabase.rpc(
      SUPABASE_RPC.DELETE_OR_DEACTIVATE_COMBO,
      { p_combo_id: comboId }
    );
  const failureMessage = mapComboWriteErrorToMessage(error);
  if (failureMessage) {
    return {
      message: failureMessage,
      status: STATUS.ERROR,
    };
  }
  throwIfSupabaseError(
    error,
    "deleteOrDeactivateComboAction"
  );

  return {
    message:
      COMBO_REMOVAL_OUTCOME_COPY[
        parseComboRemovalOutcome(
          safeString(returnedOutcome)
        )
      ],
    status: STATUS.SUCCESS,
  };
};
