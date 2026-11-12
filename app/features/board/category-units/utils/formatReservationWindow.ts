import { formatReservationCalendarTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarTime";
import { CATEGORY_UNITS_COPY } from "../constants/CategoryUnitsCopy.constants";

export const formatReservationWindow = (
  startsAt: string,
  endsAt: string
): string =>
  [
    formatReservationCalendarTime(startsAt),
    formatReservationCalendarTime(endsAt),
  ].join(CATEGORY_UNITS_COPY.WINDOW_SEPARATOR);
