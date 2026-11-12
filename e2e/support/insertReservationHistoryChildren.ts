import type { SupabaseClient } from "@supabase/supabase-js";
import {
  E2E_RESERVATION_HISTORY,
  E2E_RESERVATION_HISTORY_CATALOGUE,
  E2E_RESERVATION_HISTORY_COLUMN,
  E2E_RESERVATION_HISTORY_ERROR,
} from "../constants/E2eReservationHistory.constants";
import {
  E2E_SUPABASE_COLUMN,
  E2E_SUPABASE_TABLE,
} from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eReservationHistorySeed } from "./models/E2eReservationHistorySeed.interface";
import { readReservationHistoryCatalogueId } from "./readReservationHistoryCatalogueId";

export const insertReservationHistoryChildren = async (
  supabase: SupabaseClient,
  reservationId: string,
  seed: E2eReservationHistorySeed
): Promise<void> => {
  const column = E2E_RESERVATION_HISTORY_COLUMN;
  const catalogue = E2E_RESERVATION_HISTORY_CATALOGUE;
  const audit = {
    [column.CREATED_BY]: seed.creatorId,
    [column.RESERVATION_ID]: reservationId,
    [column.UPDATED_BY]: seed.updaterId,
  };
  const [unitId, categoryId, extraId] = await Promise.all([
    readReservationHistoryCatalogueId(
      supabase,
      E2E_SUPABASE_TABLE.EQUIPMENT_UNITS,
      column.CODE,
      seed.unitCode ?? catalogue.UNIT_CODE
    ),
    readReservationHistoryCatalogueId(
      supabase,
      E2E_SUPABASE_TABLE.EQUIPMENT_CATEGORIES,
      column.NAME,
      catalogue.QUANTITY_CATEGORY_NAME
    ),
    readReservationHistoryCatalogueId(
      supabase,
      E2E_SUPABASE_TABLE.EXTRAS,
      column.NAME,
      catalogue.EXTRA_NAME
    ),
  ]);
  const items = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATION_ITEMS)
    .insert([
      { ...audit, [column.UNIT_ID]: unitId },
      {
        ...audit,
        [column.CATEGORY_ID]: categoryId,
        [column.QUANTITY]: E2E_RESERVATION_HISTORY.QUANTITY,
      },
      { ...audit, [column.EXTRA_ID]: extraId },
    ]);
  const guide = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATION_GUIDES)
    .insert({
      [column.ASSIGNED_BY]: seed.creatorId,
      [column.RESERVATION_ID]: reservationId,
      [E2E_SUPABASE_COLUMN.WORKER_ID]: seed.guideId,
    });
  const error = items.error ?? guide.error;

  if (error) {
    failE2eOperation(
      E2E_RESERVATION_HISTORY_ERROR.CREATE_OPERATION,
      error.message
    );
  }
};
