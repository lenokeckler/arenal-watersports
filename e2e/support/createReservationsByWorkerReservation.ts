import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_RESERVATION,
  E2E_RESERVATION_COLUMNS,
} from "../constants/E2eReservationsByWorker.constants";
import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import type { E2eReservationsByWorkerReservation } from "./models/E2eReservationsByWorkerReservation.interface";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";

const removeReservation = async (
  supabase: SupabaseClient,
  reservationId: string
): Promise<void> => {
  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .delete()
    .eq(E2E_RESERVATION_COLUMNS.ID, reservationId);

  if (error) {
    failE2eOperation(
      "remove an ADM-29 reservation",
      error.message
    );
  }
};

export const createReservationsByWorkerReservation = async (
  creatorId: string,
  updaterId: string,
  customerName: string
): Promise<E2eReservationsByWorkerReservation> => {
  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .insert({
      [E2E_RESERVATION_COLUMNS.CREATED_BY]: creatorId,
      [E2E_RESERVATION_COLUMNS.CUSTOMER_NAME]: customerName,
      [E2E_RESERVATION_COLUMNS.DURATION_MINUTES]:
        E2E_RESERVATION.DURATION_MINUTES,
      [E2E_RESERVATION_COLUMNS.PEOPLE_COUNT]:
        E2E_RESERVATION.PEOPLE_COUNT,
      [E2E_RESERVATION_COLUMNS.STARTS_AT]:
        E2E_RESERVATION.STARTS_AT,
      [E2E_RESERVATION_COLUMNS.TYPE]: E2E_RESERVATION.TYPE,
      [E2E_RESERVATION_COLUMNS.UPDATED_BY]: updaterId,
    })
    .select(E2E_RESERVATION_COLUMNS.ID)
    .single();

  if (error) {
    return failE2eOperation(
      "create an ADM-29 reservation",
      error.message
    );
  }

  return {
    customerName,
    id: data.id,
    remove: () => removeReservation(supabase, data.id),
  };
};
