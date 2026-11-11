import { SUPABASE_TABLE } from "@/app/constants";
import { getCostaRicaDayRange } from "@/app/components/dispatch-board/utils/getCostaRicaDayRange";
import {
  E2E_DISPATCH_ERROR,
  E2E_DISPATCH_RESERVATION,
} from "../constants/E2eDispatchBoard.constants";
import { buildE2eCustomerName } from "./buildE2eCustomerName";
import { createServiceRoleClient } from "./createServiceRoleClient";
import { failE2eOperation } from "./failE2eOperation";
import type { PendingDispatchFixture } from "./models/PendingDispatchFixture.interface";
import { removePendingDispatchReservations } from "./removePendingDispatchReservations";

export const createPendingDispatchFixture = async (
  workerId: string,
  count: number
): Promise<PendingDispatchFixture> => {
  const supabase = createServiceRoleClient();
  const dayStartMs = new Date(
    getCostaRicaDayRange(new Date()).startsAt
  ).getTime();
  const rows = Array.from(
    { length: count },
    (_, index) => ({
      created_by: workerId,
      customer_name: buildE2eCustomerName(),
      duration_minutes:
        E2E_DISPATCH_RESERVATION.DURATION_MINUTES,
      people_count: E2E_DISPATCH_RESERVATION.PEOPLE_COUNT,
      starts_at: new Date(
        dayStartMs +
          (index + 1) * E2E_DISPATCH_RESERVATION.MINUTE_MS
      ).toISOString(),
      type: E2E_DISPATCH_RESERVATION.TYPE,
      updated_by: workerId,
    })
  );
  const { data, error } = await supabase
    .from(SUPABASE_TABLE.RESERVATIONS)
    .insert(rows)
    .select("id, code, customer_name, starts_at")
    .order("starts_at");

  if (error) {
    return failE2eOperation(
      E2E_DISPATCH_ERROR.OPERATION_INSERT,
      error.message
    );
  }

  return {
    remove: () =>
      removePendingDispatchReservations(
        supabase,
        data.map((reservation) => reservation.id)
      ),
    reservations: data.map((reservation) => ({
      code: reservation.code,
      customerName: reservation.customer_name,
    })),
  };
};
