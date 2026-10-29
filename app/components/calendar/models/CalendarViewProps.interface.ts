import type { CalendarDate, CalendarView } from "./index";

export interface CalendarViewProps {
  today: CalendarDate;
  allowedViews: readonly CalendarView[];
}
