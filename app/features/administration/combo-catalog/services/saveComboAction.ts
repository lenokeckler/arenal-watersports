"use server";

import { STATUS, SUPABASE_RPC } from "@/app/constants";
import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { SaveComboInput } from "../models/SaveComboInput.type";
import type { SaveComboResult } from "../models/SaveComboResult.interface";
import { mapComboSaveErrorToMessage } from "../utils/mapComboSaveErrorToMessage";

export const saveComboAction = async (
  input: SaveComboInput
): Promise<SaveComboResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const { data: savedComboId, error } = await supabase.rpc(
    SUPABASE_RPC.SAVE_COMBO,
    { p_payload: input }
  );
  const failureMessage = mapComboSaveErrorToMessage(error);
  if (failureMessage) {
    return {
      message: failureMessage,
      status: STATUS.ERROR,
    };
  }
  throwIfSupabaseError(error, "saveComboAction");

  return {
    comboId: safeString(savedComboId),
    status: STATUS.SUCCESS,
  };
};
