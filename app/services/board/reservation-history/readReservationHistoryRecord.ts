import {
  RESERVATION_HISTORY_OPERATION,
  SUPABASE_RPC,
  UUID_PATTERN,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { assertActiveWorkModeAccess } from "@/app/services/work-mode/assertActiveWorkModeAccess";
import type { NullableRef } from "@/app/types";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { mapReservationHistoryRecord } from "./mapReservationHistoryRecord";
import type { ReservationHistoryRecord } from "./models/ReservationHistoryRecord.interface";
import type { ReservationHistoryRecordRow } from "./models/ReservationHistoryRecordRow.type";

export const readReservationHistoryRecord = async (
  reservationId: string
): Promise<NullableRef<ReservationHistoryRecord>> => {
  await assertActiveWorkModeAccess();
  if (!UUID_PATTERN.test(reservationId)) {
    return null;
  }
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.GET_RESERVATION_HISTORY_RECORD,
    { p_reservation_id: reservationId }
  );
  throwIfSupabaseError(
    error,
    RESERVATION_HISTORY_OPERATION.RECORD
  );
  const rows: readonly ReservationHistoryRecordRow[] =
    data ?? [];
  const [row] = rows;
  return row === undefined
    ? null
    : mapReservationHistoryRecord(row);
};
