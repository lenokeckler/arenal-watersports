import { POSTGRES_ERROR_CODE } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { Extra } from "../models/Extra.interface";
import { mapExtraRowToExtra } from "../utils/mapExtraRowToExtra";

export const getExtra = async (
  extraId: string
): Promise<NullableRef<Extra>> => {
  const supabase = await createServerSupabaseClient();

  const { data: extraRow, error } = await supabase
    .from("extras")
    .select("id, name, status")
    .eq("id", extraId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(error, "getExtra");

  return extraRow ? mapExtraRowToExtra(extraRow) : null;
};
