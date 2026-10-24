import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureResources } from "../models/ReservationDetailFixtureResources.interface";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";

export const insertReservationDetailDispatches = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  const { error } = await supabase
    .from("reservation_dispatches")
    .insert([
      {
        category_id: resources.firstCategoryId,
        closed_at: fixture.FIRST_ARRIVAL,
        created_by: resources.createdById,
        dispatched_at: fixture.FIRST_DEPARTURE,
        duration_minutes: fixture.FIRST_DURATION_MINUTES,
        id: resources.firstDispatchId,
        reservation_id: resources.reservationId,
        updated_by: resources.createdById,
      },
      {
        category_id: resources.secondCategoryId,
        created_by: resources.createdById,
        dispatched_at: fixture.SECOND_DEPARTURE,
        duration_minutes: fixture.SECOND_DURATION_MINUTES,
        id: resources.secondDispatchId,
        reservation_id: resources.reservationId,
        updated_by: resources.createdById,
      },
    ]);
  ensureReservationDetailFixtureWrite(error);
};
