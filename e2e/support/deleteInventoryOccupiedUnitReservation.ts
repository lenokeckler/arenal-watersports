import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_INVENTORY_ACTIVE_DISPATCH } from "../constants/E2eInventoryScenario.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import type { E2eInventoryFixture } from "../models/E2eInventoryFixture.type";

export const deleteInventoryOccupiedUnitReservation =
  async (
    fixture: E2eInventoryFixture,
    reservationId: string
  ): Promise<void> => {
    const { error: itemsError } = await fixture.client
      .from(INVENTORY_DATA_SOURCE.RESERVATION_ITEMS_TABLE)
      .delete()
      .eq(
        E2E_INVENTORY_ACTIVE_DISPATCH.RESERVATION_ID_COLUMN,
        reservationId
      );
    throwIfSupabaseError(
      itemsError,
      INVENTORY_DATA_SOURCE.RESERVATION_ITEMS_TABLE
    );
    const { error: dispatchesError } = await fixture.client
      .from(
        INVENTORY_DATA_SOURCE.RESERVATION_DISPATCHES_TABLE
      )
      .delete()
      .eq(
        E2E_INVENTORY_ACTIVE_DISPATCH.RESERVATION_ID_COLUMN,
        reservationId
      );
    throwIfSupabaseError(
      dispatchesError,
      INVENTORY_DATA_SOURCE.RESERVATION_DISPATCHES_TABLE
    );
    const { error: reservationError } = await fixture.client
      .from(E2E_SUPABASE_TABLE.RESERVATIONS)
      .delete()
      .eq(E2E_SUPABASE_COLUMN.ID, reservationId);
    throwIfSupabaseError(
      reservationError,
      E2E_SUPABASE_TABLE.RESERVATIONS
    );
  };
