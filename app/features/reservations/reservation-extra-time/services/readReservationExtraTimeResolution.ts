import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_QUERY as QUERY } from "../constants/ReservationExtraTimeQuery.constants";
import type { ReservationExtraTimeResolutionRow } from "../models/ReservationExtraTimeResolutionRow.type";

export const readReservationExtraTimeResolution = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<
  NullableRef<ReservationExtraTimeResolutionRow>
> => {
  const { data, error } = await supabase
    .from(QUERY.TABLE.RESOLUTIONS)
    .select(QUERY.PROJECTION.RESOLUTION)
    .eq(QUERY.COLUMNS.RESERVATION_ID, reservationId)
    .maybeSingle();

  throwIfSupabaseError(
    error,
    RESERVATION_EXTRA_TIME_ERROR.OPERATION.READ_RESOLUTION
  );

  return data;
};
