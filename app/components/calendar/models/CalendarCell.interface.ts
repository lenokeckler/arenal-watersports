import type { NullableRef } from "@/app/types";
import { CALENDAR_PRESENTATION } from "@/app/constants";

export interface CalendarCell {
  key: string;
  label: string;
  fullLabel: string;
  current: NullableRef<
    typeof CALENDAR_PRESENTATION.CURRENT_DATE
  >;
  className: string;
}
