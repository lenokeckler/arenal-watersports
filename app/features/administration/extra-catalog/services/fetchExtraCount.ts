import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const fetchExtraCount = async (
  supabase: ServerSupabaseClient
): Promise<number> => {
  const { count, error } = await supabase
    .from("extras")
    .select("*", { count: "exact", head: true });
  throwIfSupabaseError(error, "fetchExtraCount");

  return count ?? LENGTH.ZERO;
};
