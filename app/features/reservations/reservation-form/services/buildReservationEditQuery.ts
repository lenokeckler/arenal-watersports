import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { RESERVATION_EDIT_QUERY } from "../constants/ReservationEditQuery.constants";

export const buildReservationEditQuery = (
  supabase: SupabaseClient<Database>,
  reservationId: string
) =>
  supabase
    .from(RESERVATION_EDIT_QUERY.TABLE)
    .select(RESERVATION_EDIT_QUERY.PROJECTION)
    .eq(RESERVATION_EDIT_QUERY.ID_COLUMN, reservationId)
    .maybeSingle();
