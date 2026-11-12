import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import type { ReservationDetailFixtureResources } from "../models/ReservationDetailFixtureResources.interface";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";

export const insertReservationDetailItems = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  const { error } = await supabase
    .from("reservation_items")
    .insert([
      {
        created_by: resources.createdById,
        dispatch_id: resources.firstDispatchId,
        reservation_id: resources.reservationId,
        unit_id: resources.firstUnitId,
        updated_by: resources.createdById,
      },
      {
        created_by: resources.createdById,
        dispatch_id: resources.secondDispatchId,
        reservation_id: resources.reservationId,
        unit_id: resources.secondUnitId,
        updated_by: resources.createdById,
      },
      {
        created_by: resources.createdById,
        extra_id: resources.extraId,
        reservation_id: resources.reservationId,
        updated_by: resources.createdById,
      },
    ]);
  ensureReservationDetailFixtureWrite(error);
};
