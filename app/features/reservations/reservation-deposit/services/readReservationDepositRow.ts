import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_DEPOSIT_ERROR } from "../constants/ReservationDepositError.constants";
import { RESERVATION_DEPOSIT_QUERY } from "../constants/ReservationDepositQuery.constants";
import type { ReservationDepositRow } from "../models/ReservationDepositRow.type";

export const readReservationDepositRow = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<NullableRef<ReservationDepositRow>> => {
  const { data, error } = await supabase
    .from(RESERVATION_DEPOSIT_QUERY.TABLE)
    .select(RESERVATION_DEPOSIT_QUERY.PROJECTION)
    .eq(RESERVATION_DEPOSIT_QUERY.COLUMNS.ID, reservationId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_DEPOSIT_ERROR.OPERATION.READ
  );

  return data;
};
