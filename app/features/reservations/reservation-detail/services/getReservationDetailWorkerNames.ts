import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_DETAIL_OPERATION } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_QUERY } from "../constants/ReservationDetailQuery.constants";
import { collectReservationDetailWorkerIds } from "../utils/collectReservationDetailWorkerIds";
import type { ReservationDetailReservationSource } from "../models/ReservationDetailReservationSource.interface";

export const getReservationDetailWorkerNames = async (
  supabase: SupabaseClient<Database>,
  source: ReservationDetailReservationSource
) => {
  const { data, error } = await supabase.rpc(
    RESERVATION_DETAIL_QUERY.WORKER_NAMES_RPC,
    {
      p_worker_ids:
        collectReservationDetailWorkerIds(source),
    }
  );

  throwIfSupabaseError(
    error,
    RESERVATION_DETAIL_OPERATION.LOAD
  );

  return data ?? [];
};
