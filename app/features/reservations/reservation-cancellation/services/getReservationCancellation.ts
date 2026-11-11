import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CANCELLATION_ERROR } from "../constants/ReservationCancellationError.constants";
import { RESERVATION_CANCELLATION_QUERY } from "../constants/ReservationCancellationQuery.constants";
import type { ReservationCancellation } from "../models/ReservationCancellation.interface";
import { mapReservationCancellation } from "../utils/mapReservationCancellation";

export const getReservationCancellation = async (
  reservationId: string
): Promise<NullableRef<ReservationCancellation>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from(RESERVATION_CANCELLATION_QUERY.TABLE)
    .select(RESERVATION_CANCELLATION_QUERY.PROJECTION)
    .eq(
      RESERVATION_CANCELLATION_QUERY.COLUMNS.ID,
      reservationId
    )
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_CANCELLATION_ERROR.OPERATION.READ
  );

  return data ? mapReservationCancellation(data) : null;
};
