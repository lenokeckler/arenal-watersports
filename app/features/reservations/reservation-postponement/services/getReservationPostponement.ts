import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_POSTPONEMENT_ERROR } from "../constants/ReservationPostponementError.constants";
import { RESERVATION_POSTPONEMENT_QUERY } from "../constants/ReservationPostponementQuery.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import { mapReservationPostponement } from "../utils/mapReservationPostponement";

export const getReservationPostponement = async (
  reservationId: string
): Promise<NullableRef<ReservationPostponement>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from(RESERVATION_POSTPONEMENT_QUERY.TABLE)
    .select(RESERVATION_POSTPONEMENT_QUERY.PROJECTION)
    .eq(
      RESERVATION_POSTPONEMENT_QUERY.COLUMNS.ID,
      reservationId
    )
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_POSTPONEMENT_ERROR.OPERATION.READ
  );

  return data ? mapReservationPostponement(data) : null;
};
