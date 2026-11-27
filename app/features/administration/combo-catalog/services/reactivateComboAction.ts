"use server";

import { STATUS, SUPABASE_RPC } from "@/app/constants";
import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { COMBO_CATALOG_COPY } from "../constants/ComboCatalogCopy.constants";
import type { ComboActionResult } from "../models/ComboActionResult.interface";
import { mapComboWriteErrorToMessage } from "../utils/mapComboWriteErrorToMessage";

export const reactivateComboAction = async (
  comboId: string
): Promise<ComboActionResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const { error } = await supabase.rpc(
    SUPABASE_RPC.SET_COMBO_ACTIVE,
    { p_active: true, p_combo_id: comboId }
  );
  const failureMessage = mapComboWriteErrorToMessage(error);
  if (failureMessage) {
    return {
      message: failureMessage,
      status: STATUS.ERROR,
    };
  }
  throwIfSupabaseError(error, "reactivateComboAction");

  return {
    message: COMBO_CATALOG_COPY.REACTIVATE_SUCCESS_TOAST,
    status: STATUS.SUCCESS,
  };
};
