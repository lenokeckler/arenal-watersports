import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_QUERY as QUERY } from "../constants/ReservationExtraTimeQuery.constants";
import type { ReservationExtraTimeReservationRow } from "../models/ReservationExtraTimeReservationRow.type";

export const readReservationExtraTimeReservation = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<
  NullableRef<ReservationExtraTimeReservationRow>
> => {
  const { data, error } = await supabase
    .from(QUERY.TABLE.RESERVATIONS)
    .select(QUERY.PROJECTION.RESERVATION)
    .eq(QUERY.COLUMNS.ID, reservationId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_EXTRA_TIME_ERROR.OPERATION.READ_RESERVATION
  );

  return data;
};
