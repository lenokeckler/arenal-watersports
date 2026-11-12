import type { NullableRef } from "@/app/types";
import type { CalendarDate } from "@/app/types";
import { CALENDAR_PRESENTATION } from "@/app/constants";

export interface CalendarCell {
  date: CalendarDate;
  key: string;
  label: string;
  fullLabel: string;
  current: NullableRef<
    typeof CALENDAR_PRESENTATION.CURRENT_DATE
  >;
  className: string;
}
