import type { ServerSupabaseClient } from "@/app/services/supabase/models/ServerSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_EXTRA_TIME_ERROR } from "../constants/ReservationExtraTimeError.constants";
import { RESERVATION_EXTRA_TIME_QUERY as QUERY } from "../constants/ReservationExtraTimeQuery.constants";
import type { ReservationExtraTimeGroupRow } from "../models/ReservationExtraTimeGroupRow.type";

export const readReservationExtraTimeGroups = async (
  supabase: ServerSupabaseClient,
  reservationId: string
): Promise<readonly ReservationExtraTimeGroupRow[]> => {
  const { data, error } = await supabase.rpc(
    QUERY.RPC.GROUPS,
    {
      [QUERY.ARGS.RESERVATION_ID]: reservationId,
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_EXTRA_TIME_ERROR.OPERATION.READ_GROUPS
  );

  return data ?? [];
};
