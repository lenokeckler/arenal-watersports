import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import { E2E_RESERVATION_DETAIL_VALUES as values } from "../constants/E2eReservationDetail.constants";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureResources } from "../models/ReservationDetailFixtureResources.interface";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";
import { insertReservationDetailDispatches } from "./insertReservationDetailDispatches";
import { insertReservationDetailItems } from "./insertReservationDetailItems";
import { insertReservationDetailMoney } from "./insertReservationDetailMoney";

const insertGuide = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  const { error } = await supabase
    .from("reservation_guides")
    .insert({
      assigned_by: resources.createdById,
      reservation_id: resources.reservationId,
      worker_id: resources.guideId,
    });
  ensureReservationDetailFixtureWrite(error);
};

const updateReservationAuditor = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  const { error } = await supabase
    .from("reservations")
    .update({ updated_by: resources.guideId })
    .eq("id", resources.reservationId);
  ensureReservationDetailFixtureWrite(error);
};

export const insertReservationDetailFixture = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources,
  customerName: string
): Promise<void> => {
  const { error } = await supabase
    .from("reservations")
    .insert({
      created_by: resources.createdById,
      customer_name: customerName,
      duration_minutes:
        fixture.RESERVATION_DURATION_MINUTES,
      id: resources.reservationId,
      people_count: fixture.PEOPLE_COUNT,
      starts_at: fixture.RESERVATION_START,
      type: values.RESERVATION_TYPE.TOUR,
      updated_by: resources.createdById,
    });
  ensureReservationDetailFixtureWrite(error);
  await insertReservationDetailDispatches(
    supabase,
    resources
  );
  await insertReservationDetailItems(supabase, resources);
  await insertGuide(supabase, resources);
  await insertReservationDetailMoney(supabase, resources);
  await updateReservationAuditor(supabase, resources);
};
