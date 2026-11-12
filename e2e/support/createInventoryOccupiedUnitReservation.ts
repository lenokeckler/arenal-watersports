import { randomUUID } from "node:crypto";
import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  E2E_INVENTORY_ACTIVE_DISPATCH,
  E2E_INVENTORY_SCENARIO,
} from "../constants/E2eInventoryScenario.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import type { E2eInventoryFixture } from "../models/E2eInventoryFixture.type";
import { deleteInventoryOccupiedUnitReservation } from "./deleteInventoryOccupiedUnitReservation";

const insertReservation = async (
  fixture: E2eInventoryFixture,
  reservationId: string,
  dispatchedAt: string
): Promise<void> => {
  const adminId = E2E_INVENTORY_SCENARIO.ADMIN_ID;
  const { error } = await fixture.client
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .insert({
      created_by: adminId,
      customer_name: `${E2E_INVENTORY_ACTIVE_DISPATCH.CUSTOMER_NAME_PREFIX} ${reservationId}`,
      duration_minutes:
        E2E_INVENTORY_ACTIVE_DISPATCH.DURATION_MINUTES,
      id: reservationId,
      people_count:
        E2E_INVENTORY_ACTIVE_DISPATCH.PEOPLE_COUNT,
      starts_at: dispatchedAt,
      type: E2E_INVENTORY_ACTIVE_DISPATCH.RESERVATION_TYPE,
      updated_by: adminId,
    });
  throwIfSupabaseError(
    error,
    E2E_SUPABASE_TABLE.RESERVATIONS
  );
};

const insertDispatch = async (
  fixture: E2eInventoryFixture,
  reservationId: string,
  dispatchId: string,
  dispatchedAt: string
): Promise<void> => {
  const adminId = E2E_INVENTORY_SCENARIO.ADMIN_ID;
  const { error } = await fixture.client
    .from(
      INVENTORY_DATA_SOURCE.RESERVATION_DISPATCHES_TABLE
    )
    .insert({
      category_id: fixture.id,
      created_by: adminId,
      dispatched_at: dispatchedAt,
      duration_minutes:
        E2E_INVENTORY_ACTIVE_DISPATCH.DURATION_MINUTES,
      id: dispatchId,
      reservation_id: reservationId,
      updated_by: adminId,
    });
  throwIfSupabaseError(
    error,
    INVENTORY_DATA_SOURCE.RESERVATION_DISPATCHES_TABLE
  );
};

const insertDispatchedUnit = async (
  fixture: E2eInventoryFixture,
  unitId: string,
  reservationId: string,
  dispatchId: string
): Promise<number> => {
  const adminId = E2E_INVENTORY_SCENARIO.ADMIN_ID;
  const { data, error } = await fixture.client
    .from(INVENTORY_DATA_SOURCE.RESERVATION_ITEMS_TABLE)
    .insert({
      created_by: adminId,
      dispatch_id: dispatchId,
      reservation_id: reservationId,
      unit_id: unitId,
      updated_by: adminId,
    })
    .select(E2E_SUPABASE_COLUMN.ID);
  throwIfSupabaseError(
    error,
    INVENTORY_DATA_SOURCE.RESERVATION_ITEMS_TABLE
  );
  if (data === null || data.length === 0) {
    throw new Error(
      E2E_INVENTORY_ACTIVE_DISPATCH.MISSING_RESERVATION_ITEM
    );
  }
  return data.length;
};

export const createInventoryOccupiedUnitReservation = (
  fixture: E2eInventoryFixture,
  unitId: string
) => {
  const reservationId = randomUUID();
  const dispatchId = randomUUID();
  const dispatchedAt = new Date().toISOString();

  const create = async (): Promise<number> => {
    await insertReservation(
      fixture,
      reservationId,
      dispatchedAt
    );
    await insertDispatch(
      fixture,
      reservationId,
      dispatchId,
      dispatchedAt
    );
    return insertDispatchedUnit(
      fixture,
      unitId,
      reservationId,
      dispatchId
    );
  };

  const cleanup = () =>
    deleteInventoryOccupiedUnitReservation(
      fixture,
      reservationId
    );

  return { cleanup, create };
};
