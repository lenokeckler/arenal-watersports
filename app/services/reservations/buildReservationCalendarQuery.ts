import type { SupabaseClient } from "@supabase/supabase-js";
import {
  PAGINATION,
  RESERVATION_CALENDAR_ACTIVE_STATUS,
  RESERVATION_CALENDAR_QUERY as query,
} from "@/app/constants";
import type { Database } from "@/app/types";
import type { ReservationCalendarWindow } from "./models/ReservationCalendarWindow.interface";
import { buildReservationCalendarFilters } from "./utils/buildReservationCalendarFilters";
import { validateReservationCalendarWindow } from "./utils/validateReservationCalendarWindow";

export const buildReservationCalendarQuery = (
  client: SupabaseClient<Database>,
  window: ReservationCalendarWindow
) => {
  const validatedWindow =
    validateReservationCalendarWindow(window);
  const filters =
    buildReservationCalendarFilters(validatedWindow);
  const firstRecordIndex =
    validatedWindow.page * PAGINATION.DEFAULT_PAGE_SIZE;
  return client
    .from(query.TABLE)
    .select(query.PROJECTION, { count: query.COUNT })
    .in(
      query.COLUMNS.STATUS,
      Object.values(RESERVATION_CALENDAR_ACTIVE_STATUS)
    )
    .lt(
      `${query.MATCHING_DISPATCHES}${query.SYNTAX.FIELD_SEPARATOR}${query.COLUMNS.DISPATCHED_AT}`,
      validatedWindow.endsAt
    )
    .or(filters.departures, {
      referencedTable: query.MATCHING_DISPATCHES,
    })
    .or(filters.reservations)
    .order(query.COLUMNS.STARTS_AT)
    .order(query.COLUMNS.ID)
    .range(
      firstRecordIndex,
      firstRecordIndex + PAGINATION.DEFAULT_PAGE_SIZE - 1
    );
};
