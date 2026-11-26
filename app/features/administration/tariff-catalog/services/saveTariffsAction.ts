"use server";

import { STATUS, SUPABASE_RPC } from "@/app/constants";
import { assertIsAdminWorker } from "@/app/services/authorization/assertIsAdminWorker";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { SaveTariffsInput } from "../models/SaveTariffsInput.type";
import type { SaveTariffsResult } from "../models/SaveTariffsResult.interface";
import { mapTariffSaveErrorToMessage } from "../utils/mapTariffSaveErrorToMessage";

export const saveTariffsAction = async (
  input: SaveTariffsInput
): Promise<SaveTariffsResult> => {
  const supabase = await createServerSupabaseClient();
  await assertIsAdminWorker(supabase);

  const { error } = await supabase.rpc(
    SUPABASE_RPC.SAVE_CATEGORY_TARIFFS,
    { p_payload: input }
  );
  const failureMessage = mapTariffSaveErrorToMessage(error);
  if (failureMessage) {
    return {
      message: failureMessage,
      status: STATUS.ERROR,
    };
  }
  throwIfSupabaseError(error, "saveTariffsAction");

  return { status: STATUS.SUCCESS };
};
