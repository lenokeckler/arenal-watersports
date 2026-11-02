import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_RESERVATION_DETAIL_FIXTURE as fixture } from "../constants/E2eReservationDetail.constants";
import type { ReservationDetailFixtureLookupResult } from "../models/ReservationDetailFixtureLookupResult.interface";

export const ensureReservationDetailFixtureLookup = <Value>(
  result: ReservationDetailFixtureLookupResult<Value>,
  operation: string
): Value => {
  throwIfSupabaseError(result.error, operation);
  const { data } = result;
  if (data === null) {
    throw new Error(fixture.FAILURE);
  }
  return data;
};
