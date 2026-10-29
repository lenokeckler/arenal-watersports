import type { SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_TABLE } from "@/app/constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";

export const removeE2eReservation = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<void> => {
  await supabase
    .from(SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .eq(E2E_SUPABASE_COLUMN.ID, reservationId);
};
