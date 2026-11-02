import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureAuthWorker } from "../models/ReservationDetailFixtureAuthWorker.interface";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";

export const createReservationDetailFixtureWorker = async (
  supabase: SupabaseClient<Database>,
  worker: ReservationDetailFixtureAuthWorker,
  creatorId: string
): Promise<void> => {
  const { error: authError } =
    await supabase.auth.admin.createUser({
      email: worker.email,
      email_confirm: true,
      id: worker.id,
      password: worker.password,
    });
  if (authError) {
    throw authError;
  }

  try {
    const { error } = await supabase
      .from("workers")
      .insert({
        base_role: "reservas",
        created_by: creatorId,
        full_name: fixture.WORKER_NAME,
        id: worker.id,
        must_change_password: false,
        personal_email: worker.email,
        updated_by: creatorId,
        username: worker.username,
      });
    ensureReservationDetailFixtureWrite(error);
  } catch (error) {
    await supabase.auth.admin.deleteUser(worker.id);
    throw error;
  }
};
