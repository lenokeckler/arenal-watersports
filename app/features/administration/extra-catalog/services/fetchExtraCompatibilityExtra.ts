import { POSTGRES_ERROR_CODE } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import type { ExtraCompatibilityReference } from "../models/ExtraCompatibilityReference.interface";

export const fetchExtraCompatibilityExtra = async (
  supabase: ServerSupabaseClient,
  extraId: string
): Promise<NullableRef<ExtraCompatibilityReference>> => {
  const { data: extraRow, error } = await supabase
    .from("extras")
    .select("id, name")
    .eq("id", extraId)
    .maybeSingle();
  if (
    error?.code ===
    POSTGRES_ERROR_CODE.INVALID_TEXT_REPRESENTATION
  ) {
    return null;
  }
  throwIfSupabaseError(
    error,
    "fetchExtraCompatibilityExtra"
  );

  return extraRow;
};
