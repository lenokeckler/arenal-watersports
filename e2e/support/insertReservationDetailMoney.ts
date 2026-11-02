import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import {
  E2E_RESERVATION_DETAIL_FIXTURE as fixture,
  E2E_RESERVATION_DETAIL_VALUES as values,
} from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureResources } from "../models/ReservationDetailFixtureResources.interface";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";

const insertPricing = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  const { error } = await supabase
    .from("reservation_pricing")
    .insert({
      agreed_amount_usd: fixture.AGREED_AMOUNT_USD,
      created_by: resources.createdById,
      reservation_id: resources.reservationId,
      updated_by: resources.createdById,
    });
  ensureReservationDetailFixtureWrite(error);
};

const createCharge = (
  resources: ReservationDetailFixtureResources,
  amount: number,
  kind: Database["public"]["Enums"]["charge_kind"]
) => ({
  amount,
  created_by: resources.createdById,
  currency: values.CURRENCY.USD,
  kind,
  payment_method: fixture.PAYMENT_METHOD.CASH,
  reservation_id: resources.reservationId,
});

const insertCharges = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  const { error } = await supabase
    .from("reservation_charges")
    .insert([
      createCharge(
        resources,
        fixture.CHARGED_AMOUNT_USD,
        values.CHARGE_KIND.TARIFF
      ),
      createCharge(
        resources,
        fixture.EXTRA_TIME_AMOUNT_USD,
        values.CHARGE_KIND.EXTRA_TIME
      ),
    ]);
  ensureReservationDetailFixtureWrite(error);
};

const insertRefund = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  const { error } = await supabase.from("refunds").insert({
    amount: fixture.REFUND_AMOUNT_USD,
    created_by: resources.createdById,
    currency: values.CURRENCY.USD,
    reason: fixture.REFUND_REASON,
    reservation_id: resources.reservationId,
  });
  ensureReservationDetailFixtureWrite(error);
};

export const insertReservationDetailMoney = async (
  supabase: SupabaseClient<Database>,
  resources: ReservationDetailFixtureResources
): Promise<void> => {
  await insertPricing(supabase, resources);
  await insertCharges(supabase, resources);
  await insertRefund(supabase, resources);
};
