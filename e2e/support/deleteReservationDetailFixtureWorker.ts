import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureAuthWorker } from "../models/ReservationDetailFixtureAuthWorker.interface";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";

export const deleteReservationDetailFixtureWorker = async (
  supabase: SupabaseClient<Database>,
  worker: ReservationDetailFixtureAuthWorker
): Promise<void> => {
  const { error: areaError } = await supabase
    .from("worker_areas")
    .delete()
    .eq("worker_id", worker.id);
  ensureReservationDetailFixtureWrite(areaError);

  const { error: workerError } = await supabase
    .from("workers")
    .delete()
    .eq("id", worker.id);
  ensureReservationDetailFixtureWrite(workerError);

  const { error: authError } =
    await supabase.auth.admin.deleteUser(worker.id);
  if (authError) {
    throw new Error(fixture.FAILURE, {
      cause: authError,
    });
  }
};
