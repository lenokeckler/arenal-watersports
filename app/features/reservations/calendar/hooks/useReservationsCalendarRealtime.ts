import { useCalendarRealtime } from "@/app/components/reservation-calendar/hooks/useCalendarRealtime";
import { RESERVATION_CALENDAR_REALTIME } from "../constants/ReservationCalendarRealtime.constants";

export const useReservationsCalendarRealtime = (
  onChange: () => void
): boolean =>
  useCalendarRealtime(
    RESERVATION_CALENDAR_REALTIME.CHANNEL,
    onChange
  );
