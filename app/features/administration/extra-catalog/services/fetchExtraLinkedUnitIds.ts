import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchExtraLinkedUnitIds = async (
  supabase: ServerSupabaseClient,
  extraId: string
): Promise<string[]> => {
  const { data: linkRows, error } = await supabase
    .from("extra_compatibility")
    .select("unit_id")
    .eq("extra_id", extraId);
  throwIfSupabaseError(error, "fetchExtraLinkedUnitIds");

  return (linkRows ?? []).map((linkRow) => linkRow.unit_id);
};
