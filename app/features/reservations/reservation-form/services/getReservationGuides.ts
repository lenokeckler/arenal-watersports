import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { WORKER_STATUS } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import { RESERVATION_GUIDE_QUERY } from "../constants/ReservationGuideQuery.constants";
import type { ReservationGuideOption } from "../models/ReservationGuideOption.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

export const getReservationGuides = async (): Promise<
  ReservationGuideOption[]
> => {
  const supabase: SupabaseClient<Database> =
    await getAuthorizedReservationFormClient();
  const currentTime = new Date().toISOString();
  const { data, error } = await supabase
    .from("workers")
    .select(
      "id, full_name, worker_marks!worker_marks_worker_id_fkey!inner(mark)"
    )
    .eq(
      RESERVATION_GUIDE_QUERY.GUIDE_MARK_COLUMN,
      RESERVATION_GUIDE_QUERY.GUIDE_MARK
    )
    .eq(
      RESERVATION_GUIDE_QUERY.ACTIVE_STATUS_COLUMN,
      WORKER_STATUS.ACTIVE
    )
    .or(
      `${RESERVATION_GUIDE_QUERY.EXPIRATION_COLUMN}.is.null,${RESERVATION_GUIDE_QUERY.EXPIRATION_COLUMN}.gt.${currentTime}`
    )
    .order("full_name");

  throwIfSupabaseError(
    error,
    RESERVATION_SERVICE_OPERATION.LOAD_GUIDES
  );

  return (data ?? []).map((worker) => ({
    id: worker.id,
    name: worker.full_name,
  }));
};
