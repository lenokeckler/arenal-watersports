import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_REFUND_ERROR } from "../constants/ReservationRefundError.constants";
import { RESERVATION_REFUND_QUERY } from "../constants/ReservationRefundQuery.constants";
import type { ReservationRefundRow } from "../models/ReservationRefundRow.type";

export const readReservationRefundRow = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<NullableRef<ReservationRefundRow>> => {
  const { data, error } = await supabase
    .from(RESERVATION_REFUND_QUERY.TABLE)
    .select(RESERVATION_REFUND_QUERY.PROJECTION)
    .eq(RESERVATION_REFUND_QUERY.COLUMNS.ID, reservationId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_REFUND_ERROR.OPERATION.READ
  );

  return data;
};
