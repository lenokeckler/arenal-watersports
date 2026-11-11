import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import type { ListPageRange } from "@/app/utils/list-pagination/models/ListPageRange.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_RESERVATION_QUERY } from "../constants/UnitReservationQuery.constants";
import type { UnitReservationRow } from "../models/UnitReservationRow.type";

export const fetchUnitReservations = async (
  supabase: ServerSupabaseClient,
  unitId: string,
  range: ListPageRange
): Promise<UnitReservationRow[]> => {
  const { data: reservationRows, error } = await supabase
    .from("reservations")
    .select(UNIT_RESERVATION_QUERY.COLUMNS)
    .eq(UNIT_RESERVATION_QUERY.UNIT_COLUMN, unitId)
    .order(UNIT_RESERVATION_QUERY.START_COLUMN, {
      ascending: false,
    })
    .order(UNIT_RESERVATION_QUERY.ID_COLUMN, {
      ascending: true,
    })
    .range(range.from, range.to);
  throwIfSupabaseError(
    error,
    UNIT_RESERVATION_QUERY.OPERATION.PAGE
  );

  return reservationRows ?? [];
};
