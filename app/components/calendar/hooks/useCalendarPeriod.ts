import { useEffect, useMemo } from "react";
import type { CalendarDate } from "@/app/types";
import type { CalendarView } from "@/app/types";
import { buildCalendarPeriod } from "../utils";

export const useCalendarPeriod = (
  anchor: CalendarDate,
  selectedView: CalendarView,
  onPeriodChange:
    | ((
        period: ReturnType<typeof buildCalendarPeriod>
      ) => void)
    | undefined
) => {
  const period = useMemo(
    () => buildCalendarPeriod(anchor, selectedView),
    [anchor, selectedView]
  );
  useEffect(() => {
    onPeriodChange?.(period);
  }, [onPeriodChange, period]);
  return period;
};
