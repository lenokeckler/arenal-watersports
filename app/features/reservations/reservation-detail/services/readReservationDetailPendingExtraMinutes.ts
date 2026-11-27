import type { SupabaseClient } from "@supabase/supabase-js";
import { RESERVATION_STATUS } from "@/app/constants";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  RESERVATION_DETAIL_NO_EXTRA_MINUTES,
  RESERVATION_DETAIL_OPERATION,
} from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_QUERY } from "../constants/ReservationDetailQuery.constants";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

export const readReservationDetailPendingExtraMinutes =
  async (
    supabase: SupabaseClient<Database>,
    source: Pick<
      ReservationDetailReservationSource,
      "id" | "reservation_extra_time_resolutions" | "status"
    >
  ): Promise<number> => {
    if (
      source.status !== RESERVATION_STATUS.CLOSED ||
      source.reservation_extra_time_resolutions !== null
    ) {
      return RESERVATION_DETAIL_NO_EXTRA_MINUTES;
    }

    const { data, error } = await supabase.rpc(
      RESERVATION_DETAIL_QUERY.EXTRA_TIME.RPC,
      {
        [RESERVATION_DETAIL_QUERY.EXTRA_TIME.ARG]:
          source.id,
      }
    );

    throwIfSupabaseError(
      error,
      RESERVATION_DETAIL_OPERATION.EXTRA_TIME
    );

    return (data ?? []).reduce(
      (total, group) => total + group.extra_minutes,
      RESERVATION_DETAIL_NO_EXTRA_MINUTES
    );
  };
