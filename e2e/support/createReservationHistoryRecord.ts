import {
  E2E_RESERVATION_HISTORY,
  E2E_RESERVATION_HISTORY_COLUMN,
  E2E_RESERVATION_HISTORY_ERROR,
} from "../constants/E2eReservationHistory.constants";
import { E2E_SUPABASE_TABLE } from "../constants/E2eSupabase.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import { insertReservationHistoryChildren } from "./insertReservationHistoryChildren";
import type { E2eReservationHistoryRecord } from "./models/E2eReservationHistoryRecord.interface";
import type { E2eReservationHistorySeed } from "./models/E2eReservationHistorySeed.interface";
import { removeReservationHistoryRecord } from "./removeReservationHistoryRecord";

export const createReservationHistoryRecord = async (
  seed: E2eReservationHistorySeed
): Promise<E2eReservationHistoryRecord> => {
  const supabase = createServiceRoleClient();
  const column = E2E_RESERVATION_HISTORY_COLUMN;
  const { data, error } = await supabase
    .from(E2E_SUPABASE_TABLE.RESERVATIONS)
    .insert({
      [column.CANCELLATION_REASON]:
        seed.cancellationReason ?? null,
      [column.CREATED_BY]: seed.creatorId,
      [column.CUSTOMER_NAME]: seed.customerName,
      [column.DURATION_MINUTES]:
        E2E_RESERVATION_HISTORY.DURATION_MINUTES,
      [column.PEOPLE_COUNT]:
        E2E_RESERVATION_HISTORY.PEOPLE_COUNT,
      [column.STARTS_AT]:
        seed.startsAt ?? E2E_RESERVATION_HISTORY.STARTS_AT,
      [column.STATUS]: seed.status,
      [column.TYPE]:
        seed.type ?? E2E_RESERVATION_HISTORY.TYPE,
      [column.UPDATED_BY]: seed.updaterId,
    })
    .select(column.ID)
    .single();

  if (error) {
    return failE2eOperation(
      E2E_RESERVATION_HISTORY_ERROR.CREATE_OPERATION,
      error.message
    );
  }

  const remove = (): Promise<void> =>
    removeReservationHistoryRecord(supabase, data.id);

  try {
    await insertReservationHistoryChildren(
      supabase,
      data.id,
      seed
    );
  } catch (childError: unknown) {
    await remove();
    throw childError;
  }

  return {
    customerName: seed.customerName,
    id: data.id,
    remove,
  };
};
