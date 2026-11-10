import { UUID_PATTERN } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SPLIT_ERROR } from "../constants/ReservationSplitError.constants";
import { RESERVATION_SPLIT_QUERY } from "../constants/ReservationSplitQuery.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import { mapReservationSplit } from "../utils/mapReservationSplit";

export const getReservationSplit = async (
  reservationId: string
): Promise<NullableRef<ReservationSplit>> => {
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from(RESERVATION_SPLIT_QUERY.TABLE)
    .select(RESERVATION_SPLIT_QUERY.PROJECTION)
    .eq(RESERVATION_SPLIT_QUERY.COLUMNS.ID, reservationId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_SPLIT_ERROR.OPERATION.READ
  );

  return data ? mapReservationSplit(data) : null;
};
