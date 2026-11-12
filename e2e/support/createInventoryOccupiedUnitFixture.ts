import {
  INVENTORY_DATA_SOURCE,
  INVENTORY_TRACKING_MODE,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import {
  E2E_INVENTORY_ACTIVE_DISPATCH,
  E2E_INVENTORY_SCENARIO,
} from "../constants/E2eInventoryScenario.constants";
import type { E2eInventoryFixture } from "../models/E2eInventoryFixture.type";
import { createInventoryCategoryFixture } from "./createInventoryCategoryFixture";
import { createInventoryOccupiedUnitReservation } from "./createInventoryOccupiedUnitReservation";
import { seedInventoryUnitStates } from "./seedInventoryUnitStates";

const setInventoryCategoryReservable = async (
  fixture: E2eInventoryFixture
): Promise<void> => {
  const { error } = await fixture.client
    .from(INVENTORY_DATA_SOURCE.EQUIPMENT_CATEGORIES_TABLE)
    .update({
      default_duration_minutes:
        E2E_INVENTORY_ACTIVE_DISPATCH.DURATION_MINUTES,
      is_reservable: true,
    })
    .eq(E2E_INVENTORY_SCENARIO.ID_COLUMN, fixture.id);
  throwIfSupabaseError(error, fixture.name);
};

const seedReservableUnit = async (
  fixture: E2eInventoryFixture
) => {
  await setInventoryCategoryReservable(fixture);
  const units = await seedInventoryUnitStates(fixture);
  const availableUnit = units.find(
    ({ status }) =>
      status === INVENTORY_UNIT_STATUS.AVAILABLE
  );
  if (!availableUnit) {
    throw new Error(
      E2E_INVENTORY_ACTIVE_DISPATCH.MISSING_AVAILABLE_UNIT
    );
  }
  return availableUnit;
};

export const createInventoryOccupiedUnitFixture =
  async () => {
    const fixture = await createInventoryCategoryFixture(
      INVENTORY_TRACKING_MODE.BY_UNIT
    );
    let reservationFixture: NullableRef<
      ReturnType<
        typeof createInventoryOccupiedUnitReservation
      >
    > = null;
    const cleanup = async (): Promise<void> => {
      try {
        if (reservationFixture !== null) {
          await reservationFixture.cleanup();
        }
      } finally {
        await fixture.cleanup();
      }
    };

    try {
      const availableUnit =
        await seedReservableUnit(fixture);
      reservationFixture =
        createInventoryOccupiedUnitReservation(
          fixture,
          availableUnit.id
        );
      const occupiedUnitCount =
        await reservationFixture.create();

      return {
        cleanup,
        id: fixture.id,
        occupiedUnitCode: availableUnit.code,
        occupiedUnitCount,
      };
    } catch (error) {
      await cleanup();
      throw error;
    }
  };
