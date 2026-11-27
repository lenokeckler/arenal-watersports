import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ComboForEdit } from "../models/ComboForEdit.interface";
import { mapComboRowToComboForEdit } from "../utils/mapComboRowToComboForEdit";
import { buildComboForEditQuery } from "./buildComboForEditQuery";

export const getComboForEdit = async (
  comboId: string
): Promise<NullableRef<ComboForEdit>> => {
  const supabase = await createServerSupabaseClient();

  const { data: comboRow, error } =
    await buildComboForEditQuery(supabase, comboId);
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getComboForEdit");

  return comboRow
    ? mapComboRowToComboForEdit(comboRow)
    : null;
};
