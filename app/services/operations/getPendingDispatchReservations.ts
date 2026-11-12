import { getCostaRicaDayRange } from "@/app/components/dispatch-board/utils/getCostaRicaDayRange";
import { getOperationsSupabaseClient } from "./getOperationsSupabaseClient";
import { readPendingDispatchReservations } from "./readPendingDispatchReservations";
import type { PendingDispatchReservationsPage } from "@/app/components/dispatch-board/models/PendingDispatchReservationsPage.interface";

export const getPendingDispatchReservations = async (
  page: number,
  currentDate: Date = new Date()
): Promise<PendingDispatchReservationsPage> => {
  const supabase = await getOperationsSupabaseClient();
  const { startsAt, endsAt } =
    getCostaRicaDayRange(currentDate);
  return readPendingDispatchReservations(
    supabase,
    page,
    startsAt,
    endsAt
  );
};

export { OperationsAccessError } from "./getOperationsSupabaseClient";
