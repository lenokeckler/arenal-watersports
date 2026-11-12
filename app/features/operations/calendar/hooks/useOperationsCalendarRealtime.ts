import { useCalendarRealtime } from "@/app/components/reservation-calendar/hooks/useCalendarRealtime";
import { OPERATIONS_CALENDAR_REALTIME } from "../constants/OperationsCalendarIntegration.constants";

export const useOperationsCalendarRealtime = (
  onChange: () => void
): boolean =>
  useCalendarRealtime(
    OPERATIONS_CALENDAR_REALTIME.CHANNEL,
    onChange
  );
