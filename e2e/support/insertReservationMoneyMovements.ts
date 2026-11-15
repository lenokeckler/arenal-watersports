import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/app/types";
import {
  E2E_RESERVATION_MONEY_MOVEMENTS_FIXTURE as fixture,
  E2E_RESERVATION_MONEY_MOVEMENTS_VALUES as values,
} from "../constants/E2eReservationMoneyMovements.constants";
import type { ReservationMoneyMovementsCreatedAt } from "../models/ReservationMoneyMovementsCreatedAt.interface";
import { ensureReservationDetailFixtureWrite } from "./ensureReservationDetailFixtureWrite";

type ChargeInsert =
  Database["public"]["Tables"]["reservation_charges"]["Insert"];

const loadCreatedById = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
): Promise<string> => {
  const { data, error } = await supabase
    .from("reservations")
    .select("created_by")
    .eq("id", reservationId)
    .single();
  ensureReservationDetailFixtureWrite(error);
  if (!data) {
    throw new Error(fixture.CREATED_BY_FAILURE);
  }
  return data.created_by;
};

const requireCreatedAt = (
  row: { created_at: string } | null
): string => {
  if (!row) {
    throw new Error(fixture.CREATED_AT_FAILURE);
  }
  return row.created_at;
};

const insertCharge = async (
  supabase: SupabaseClient<Database>,
  charge: ChargeInsert
): Promise<string> => {
  const { data, error } = await supabase
    .from("reservation_charges")
    .insert(charge)
    .select("created_at")
    .single();
  ensureReservationDetailFixtureWrite(error);
  return requireCreatedAt(data);
};

export const insertReservationMoneyMovements = async (
  supabase: SupabaseClient<Database>,
  reservationId: string
): Promise<ReservationMoneyMovementsCreatedAt> => {
  const createdById = await loadCreatedById(
    supabase,
    reservationId
  );
  const tariff = await insertCharge(supabase, {
    amount: fixture.TARIFF_AMOUNT_USD,
    created_by: createdById,
    currency: values.CURRENCY.USD,
    kind: values.CHARGE_KIND.TARIFF,
    payment_method: fixture.CASH,
    reservation_id: reservationId,
  });
  const extraTime = await insertCharge(supabase, {
    amount: fixture.EXTRA_TIME_AMOUNT_CRC,
    created_by: createdById,
    currency: values.CURRENCY.CRC,
    kind: values.CHARGE_KIND.EXTRA_TIME,
    payment_method: fixture.CARD,
    reservation_id: reservationId,
  });
  const { data, error } = await supabase
    .from("refunds")
    .insert({
      amount: fixture.REFUND_AMOUNT_USD,
      created_by: createdById,
      currency: values.CURRENCY.USD,
      reason: fixture.REFUND_REASON,
      reservation_id: reservationId,
    })
    .select("created_at")
    .single();
  ensureReservationDetailFixtureWrite(error);
  return {
    extraTime,
    refund: requireCreatedAt(data),
    tariff,
  };
};
