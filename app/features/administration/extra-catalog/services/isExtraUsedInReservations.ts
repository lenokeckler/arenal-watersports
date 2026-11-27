import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";

export const isExtraUsedInReservations = async (
  supabase: ServerSupabaseClient,
  extraId: string
): Promise<boolean> => {
  const { count, error } = await supabase
    .from("reservation_items")
    .select("id", { count: "exact", head: true })
    .eq("extra_id", extraId);
  throwIfSupabaseError(error, "isExtraUsedInReservations");

  return (count ?? LENGTH.ZERO) > LENGTH.ZERO;
};
