import { LENGTH } from "@/app/constants";
import type { ServerSupabaseClient } from "@/app/services/supabase/AppSupabaseClient.type";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { UNIT_RESERVATION_QUERY } from "../constants/UnitReservationQuery.constants";

export const fetchUnitReservationCount = async (
  supabase: ServerSupabaseClient,
  unitId: string
): Promise<number> => {
  const { count, error } = await supabase
    .from("reservations")
    .select(UNIT_RESERVATION_QUERY.COUNT_COLUMNS, {
      count: "exact",
      head: true,
    })
    .eq(UNIT_RESERVATION_QUERY.UNIT_COLUMN, unitId);
  throwIfSupabaseError(
    error,
    UNIT_RESERVATION_QUERY.OPERATION.COUNT
  );

  return count ?? LENGTH.ZERO;
};
