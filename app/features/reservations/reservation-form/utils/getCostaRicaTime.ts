import { RESERVATION_CALENDAR_TIME } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";

export const getCostaRicaTime = (date: Date): string =>
  new Intl.DateTimeFormat(
    RESERVATION_CALENDAR_TIME.LOCALE,
    RESERVATION_CALENDAR_TIME.OPTIONS
  ).format(date);
