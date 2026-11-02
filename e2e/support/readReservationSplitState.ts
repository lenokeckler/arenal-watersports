import {
  CHARGE_QUERY,
  SUPABASE_TABLE,
} from "@/app/constants";
import { E2E_SUPABASE_COLUMN } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import type { ReservationSplitState } from "./models/ReservationSplitState.interface";

const PARENT_COLUMN = "parent_reservation_id";
const RESERVATION_COLUMN = "reservation_id";
const READ_OPERATION = "read the split reservation state";
const EXACT_COUNT = "exact";

export const readReservationSplitState = async (
  originalId: string
): Promise<ReservationSplitState> => {
  const supabase = createServiceRoleClient();
  const children = await supabase
    .from(SUPABASE_TABLE.RESERVATIONS)
    .select(E2E_SUPABASE_COLUMN.ID)
    .eq(PARENT_COLUMN, originalId);
  if (children.error) {
    return failE2eOperation(
      READ_OPERATION,
      children.error.message
    );
  }
  const departureIds = children.data.map(({ id }) => id);
  const countRows = async (
    table: string,
    reservationIds: string[]
  ): Promise<number> => {
    const { count, error } = await supabase
      .from(table)
      .select(E2E_SUPABASE_COLUMN.ID, {
        count: EXACT_COUNT,
        head: true,
      })
      .in(RESERVATION_COLUMN, reservationIds);
    if (error) {
      return failE2eOperation(
        READ_OPERATION,
        error.message
      );
    }
    return count ?? 0;
  };

  return {
    chargesOnDepartures: await countRows(
      CHARGE_QUERY.TABLE,
      departureIds
    ),
    chargesOnOriginal: await countRows(CHARGE_QUERY.TABLE, [
      originalId,
    ]),
    departures: departureIds.length,
    depositsOnDepartures: await countRows(
      SUPABASE_TABLE.DEPOSITS,
      departureIds
    ),
    depositsOnOriginal: await countRows(
      SUPABASE_TABLE.DEPOSITS,
      [originalId]
    ),
  };
};
