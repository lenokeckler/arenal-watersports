import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_DETAIL_OPERATION } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_QUERY } from "../constants/ReservationDetailQuery.constants";

export const loadReservationDetailSource = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
) => {
  const { data, error } = await supabase
    .from("reservations")
    .select(RESERVATION_DETAIL_QUERY.SELECT)
    .eq("id", reservationId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_DETAIL_OPERATION.LOAD
  );

  return data;
};
