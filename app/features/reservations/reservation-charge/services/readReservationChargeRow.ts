import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_CHARGE_ERROR } from "../constants/ReservationChargeError.constants";
import { RESERVATION_CHARGE_QUERY } from "../constants/ReservationChargeQuery.constants";
import type { ReservationChargeRow } from "../models/ReservationChargeRow.type";

export const readReservationChargeRow = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<NullableRef<ReservationChargeRow>> => {
  const { data, error } = await supabase
    .from(RESERVATION_CHARGE_QUERY.TABLE)
    .select(RESERVATION_CHARGE_QUERY.PROJECTION)
    .eq(RESERVATION_CHARGE_QUERY.COLUMNS.ID, reservationId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_CHARGE_ERROR.OPERATION.READ
  );

  return data;
};
