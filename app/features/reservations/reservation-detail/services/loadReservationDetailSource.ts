import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_DETAIL_OPERATION } from "../constants/ReservationDetail.constants";
import { buildReservationDetailSourceQuery } from "./buildReservationDetailSourceQuery";

export const loadReservationDetailSource = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
) => {
  const { data, error } =
    await buildReservationDetailSourceQuery(
      supabase,
      reservationId
    );

  throwIfSupabaseError(
    error,
    RESERVATION_DETAIL_OPERATION.LOAD
  );

  return data;
};
