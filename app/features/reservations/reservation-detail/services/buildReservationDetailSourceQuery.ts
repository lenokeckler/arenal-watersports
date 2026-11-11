import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { RESERVATION_DETAIL_QUERY } from "../constants/ReservationDetailQuery.constants";

export const buildReservationDetailSourceQuery = (
  supabase: SupabaseClient<Database>,
  reservationId: string
) =>
  supabase
    .from("reservations")
    .select(RESERVATION_DETAIL_QUERY.SELECT)
    .eq("id", reservationId)
    .order(
      RESERVATION_DETAIL_QUERY.ORDER.RESERVATION_ITEMS.ID,
      {
        ascending: true,
        referencedTable:
          RESERVATION_DETAIL_QUERY.ORDER.RESERVATION_ITEMS
            .TABLE,
      }
    )
    .order(
      RESERVATION_DETAIL_QUERY.ORDER.RESERVATION_DISPATCHES
        .DISPATCHED_AT,
      {
        ascending: true,
        referencedTable:
          RESERVATION_DETAIL_QUERY.ORDER
            .RESERVATION_DISPATCHES.TABLE,
      }
    )
    .order(
      RESERVATION_DETAIL_QUERY.ORDER.RESERVATION_DISPATCHES
        .ID,
      {
        ascending: true,
        referencedTable:
          RESERVATION_DETAIL_QUERY.ORDER
            .RESERVATION_DISPATCHES.TABLE,
      }
    )
    .maybeSingle();
