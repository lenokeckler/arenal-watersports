import {
  RESERVATION_CALENDAR_QUERY_ERROR,
  SUPABASE_WORK_AREA,
} from "@/app/constants";
import type { WorkArea } from "@/app/types";
import { createServerSupabaseClient } from "@/app/services/supabase";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { assertReservationCalendarAccess } from "./assertReservationCalendarAccess";
import { buildReservationCalendarQuery } from "./buildReservationCalendarQuery";
import { fetchReservationCalendarRows } from "./fetchReservationCalendarRows";
import type { ReservationCalendarReadResult } from "./models/ReservationCalendarReadResult.interface";
import type { ReservationCalendarReadWindow } from "./models/ReservationCalendarReadWindow.interface";

export const readReservationCalendarRows = async (
  window: ReservationCalendarReadWindow,
  workArea: WorkArea = SUPABASE_WORK_AREA.RESERVATIONS
): Promise<ReservationCalendarReadResult> => {
  await assertReservationCalendarAccess(workArea);
  const supabase = await createServerSupabaseClient();
  return fetchReservationCalendarRows(async (page) => {
    const result = await buildReservationCalendarQuery(
      supabase,
      { ...window, page }
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
