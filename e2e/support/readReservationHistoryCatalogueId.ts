import type { SupabaseClient } from "@supabase/supabase-js";
import { E2E_RESERVATION_HISTORY_ERROR } from "../constants/E2eReservationHistory.constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { failE2eOperation } from "./failE2eOperation";
import type { E2eReservationHistoryCatalogueTable } from "./models/E2eReservationHistoryCatalogueTable.type";

export const readReservationHistoryCatalogueId = async (
  supabase: SupabaseClient,
  table: E2eReservationHistoryCatalogueTable,
  column: string,
  value: string
): Promise<string> => {
  const { data, error } = await supabase
    .from(table)
    .select(E2E_SUPABASE_COLUMN.ID)
    .eq(column, value)
    .single();

  if (error) {
    return failE2eOperation(
      E2E_RESERVATION_HISTORY_ERROR.READ_CATALOGUE_OPERATION,
      error.message
    );
  }

  return data.id;
};
