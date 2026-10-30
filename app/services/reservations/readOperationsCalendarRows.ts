import { RESERVATION_CALENDAR_QUERY_ERROR } from "@/app/constants";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { assertOperationsCalendarAccess } from "./assertOperationsCalendarAccess";
import { buildReservationCalendarQuery } from "./buildReservationCalendarQuery";
import { fetchReservationCalendarRows } from "./fetchReservationCalendarRows";
import type { ReservationCalendarReadResult } from "./models/ReservationCalendarReadResult.interface";
import type { ReservationCalendarReadWindow } from "./models/ReservationCalendarReadWindow.interface";

export const readOperationsCalendarRows = async (
  window: ReservationCalendarReadWindow
): Promise<ReservationCalendarReadResult> => {
  await assertOperationsCalendarAccess();
  const supabase = await createServerSupabaseClient();
  return fetchReservationCalendarRows(async (page) => {
    const result = await buildReservationCalendarQuery(
      supabase,
      {
        ...window,
        page,
      }
    );
    throwIfSupabaseError(
      result.error,
      RESERVATION_CALENDAR_QUERY_ERROR.INCOMPLETE_RESULTS
    );
    return {
      count: result.count,
      rows: result.data,
    };
  });
};
