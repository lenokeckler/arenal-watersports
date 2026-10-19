import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { RESERVATION_SERVICE_OPERATION } from "../constants/ReservationServiceOperation.constants";
import type { ReservationGuideOption } from "../models/ReservationGuideOption.interface";
import { getAuthorizedReservationFormClient } from "./getAuthorizedReservationFormClient";

export const getReservationGuides = async (): Promise<
  ReservationGuideOption[]
> => {
  const supabase: SupabaseClient<Database> =
    await getAuthorizedReservationFormClient();
  const { data, error } = await supabase
    .from("workers")
    .select(
      "id, full_name, worker_marks!worker_marks_worker_id_fkey!inner(mark)"
    )
    .eq("worker_marks.mark", "guia")
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
