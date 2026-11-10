import { createServiceRoleSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_ADMIN_ACCOUNT } from "../constants/E2eAccounts.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { insertE2eReservation } from "./insertE2eReservation";

export const removeExtraUsages = async (
  reservationIds: string[]
): Promise<void> => {
  const supabase = createServiceRoleSupabaseClient();
  const failures: Error[] = [];

  for (const reservationId of reservationIds) {
    const items = await supabase
      .from(E2E_SUPABASE_TABLE.RESERVATION_ITEMS)
      .delete()
      .eq(
        E2E_SUPABASE_COLUMN.RESERVATION_ID,
        reservationId
      );
    const reservation = await supabase
      .from(E2E_SUPABASE_TABLE.RESERVATIONS)
      .delete()
      .eq(E2E_SUPABASE_COLUMN.ID, reservationId);

    for (const { error } of [items, reservation]) {
      if (error) {
        failures.push(
          new Error(`removeExtraUsages: ${reservationId}`, {
            cause: error,
          })
        );
      }
    }
  }

  if (failures.length > 0) {
    throw new AggregateError(
      failures,
      "removeExtraUsages: some usages were not removed"
    );
  }
};

const discardFailedExtraUsage = async (
  reservationId: string,
  insertError: unknown
): Promise<void> => {
  try {
    await removeExtraUsages([reservationId]);
  } catch (cleanupError) {
    throw new AggregateError(
      [insertError, cleanupError],
      "insertExtraUsage: the reservation was not removed after the insert failed"
    );
  }
};

export const insertExtraUsage = async (
  extraId: string
): Promise<string> => {
  const supabase = createServiceRoleSupabaseClient();
  const reservation = await insertE2eReservation(
    supabase,
    E2E_ADMIN_ACCOUNT.workerId,
    buildE2eCustomerName()
  );

  const { error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATION_ITEMS)
    .insert({
      created_by: E2E_ADMIN_ACCOUNT.workerId,
      extra_id: extraId,
      reservation_id: reservation.id,
      updated_by: E2E_ADMIN_ACCOUNT.workerId,
    });
  if (error) {
    await discardFailedExtraUsage(reservation.id, error);
  }
  throwIfSupabaseError(error, "insertExtraUsage");

  return reservation.id;
};

export const reservationExists = async (
  reservationId: string
): Promise<boolean> => {
  const supabase = createServiceRoleSupabaseClient();

  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .select(E2E_SUPABASE_COLUMN.ID)
    .eq(E2E_SUPABASE_COLUMN.ID, reservationId)
    .maybeSingle();
  throwIfSupabaseError(error, "reservationExists");

  return data !== null;
};
