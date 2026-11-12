import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { E2E_UNIT_RESERVATION } from "../constants/E2eUnitReservationHistory.constants";
import type { UnitReservationFixtureHandle } from "../models/UnitReservationFixtureHandle.interface";
import type { UnitReservationFixtureRecord } from "../models/UnitReservationFixtureRecord.interface";
import type { UnitReservationFixtureSeed } from "../models/UnitReservationFixtureSeed.interface";

const insertReservation = async (
  seed: UnitReservationFixtureSeed
): Promise<UnitReservationFixtureRecord> => {
  const adminId = E2E_ADMIN_ACCOUNT.workerId;
  const { data: reservation, error } =
    await createServiceRoleSupabaseClient()
      .from("reservations")
      .insert({
        created_by: adminId,
        customer_name: seed.customerName,
        duration_minutes:
          E2E_UNIT_RESERVATION.DURATION_MINUTES,
        people_count: E2E_UNIT_RESERVATION.PEOPLE_COUNT,
        starts_at: seed.startsAt,
        type: E2E_UNIT_RESERVATION.TYPE,
        updated_by: adminId,
      })
      .select("id, code, customer_name")
      .single();
  throwIfSupabaseError(error, "insertUnitReservation");
  if (!reservation) {
    throw new Error(
      E2E_UNIT_RESERVATION.MISSING_RESERVATION
    );
  }

  return {
    code: reservation.code,
    customerName: reservation.customer_name,
    id: reservation.id,
  };
};

const insertReservationItem = async (
  unitId: string,
  reservationId: string
): Promise<void> => {
  const adminId = E2E_ADMIN_ACCOUNT.workerId;
  const { error } = await createServiceRoleSupabaseClient()
    .from("reservation_items")
    .insert({
      created_by: adminId,
      reservation_id: reservationId,
      unit_id: unitId,
      updated_by: adminId,
    });
  throwIfSupabaseError(error, "insertUnitReservationItem");
};

const removeUnitReservations = async (
  reservationIds: string[]
): Promise<void> => {
  if (reservationIds.length === 0) {
    return;
  }

  const supabase = createServiceRoleSupabaseClient();
  const { error: itemsError } = await supabase
    .from("reservation_items")
    .delete()
    .in("reservation_id", reservationIds);
  throwIfSupabaseError(
    itemsError,
    "removeUnitReservationItems"
  );

  const { error } = await supabase
    .from("reservations")
    .delete()
    .in(E2E_SUPABASE_COLUMN.ID, reservationIds);
  throwIfSupabaseError(error, "removeUnitReservations");
};

export const createUnitReservationFixture = async (
  unitId: string,
  seeds: UnitReservationFixtureSeed[]
): Promise<UnitReservationFixtureHandle> => {
  const records: UnitReservationFixtureRecord[] = [];
  const cleanup = (): Promise<void> =>
    removeUnitReservations(
      records.map((record) => record.id)
    );

  try {
    for (const seed of seeds) {
      const record = await insertReservation(seed);
      records.push(record);
      await insertReservationItem(unitId, record.id);
    }
  } catch (error) {
    await cleanup();
    throw error;
  }

  return { cleanup, records };
};
