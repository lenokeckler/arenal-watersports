import { RESERVATION_CALENDAR_LIST } from "@/app/components/reservation-calendar/constants/ReservationCalendarList.constants";
import type { ReservationCalendarSnapshot } from "@/app/components/reservation-calendar/models/ReservationCalendarSnapshot.interface";
import { RESERVATIONS_CALENDAR_SELECTION } from "./ReservationsCalendarSelection.constants";

const FIRST_RESERVATION_DAY = 1;
const RESERVATION_COUNT =
  RESERVATION_CALENDAR_LIST.PAGE_SIZE_OPTIONS[0] +
  RESERVATION_CALENDAR_LIST.PAGE_INCREMENT;
const BASE_ENTRY =
  RESERVATIONS_CALENDAR_SELECTION.SNAPSHOT.entries[0];

export const RESERVATIONS_CALENDAR_AGENDA_PAGINATION_SNAPSHOT: ReservationCalendarSnapshot =
  {
    ...RESERVATIONS_CALENDAR_SELECTION.SNAPSHOT,
    entries: Array.from(
      { length: RESERVATION_COUNT },
      (_, index) => {
        const day = FIRST_RESERVATION_DAY + index;
        const dayValue = day.toString().padStart(2, "0");
        const startsAt = `2026-10-${dayValue}T16:00:00Z`;
        return {
          ...BASE_ENTRY,
          customerName: `Reservation ${dayValue}`,
          endsAt: `2026-10-${dayValue}T17:00:00Z`,
          id: `reservation-pagination-${dayValue}`,
          startsAt,
        };
      }
    ),
    totalCount: RESERVATION_COUNT,
  };
