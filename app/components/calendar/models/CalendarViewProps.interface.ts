import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";

export interface CalendarViewProps {
  heading: string;
  today: CalendarDate;
  allowedViews: readonly CalendarView[];
}
