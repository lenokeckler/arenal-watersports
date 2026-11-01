import {
  RESERVATION_HISTORY_OPERATION,
  SUPABASE_RPC,
} from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { assertActiveWorkModeAccess } from "@/app/services/work-mode/assertActiveWorkModeAccess";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { buildReservationHistoryListArguments } from "./buildReservationHistoryListArguments";
import { buildReservationHistoryPage } from "./buildReservationHistoryPage";
import type { ReservationHistoryPage } from "./models/ReservationHistoryPage.interface";
import type { ReservationHistoryQuery } from "./models/ReservationHistoryQuery.interface";

export const readReservationHistory = async (
  query: ReservationHistoryQuery
): Promise<ReservationHistoryPage> => {
  await assertActiveWorkModeAccess();
  if (query.hasInvertedDateRange) {
    return buildReservationHistoryPage([]);
  }
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.rpc(
    SUPABASE_RPC.LIST_RESERVATION_HISTORY,
    buildReservationHistoryListArguments(query)
  );
  throwIfSupabaseError(
    error,
    RESERVATION_HISTORY_OPERATION.LIST
  );
  return buildReservationHistoryPage(data ?? []);
};
