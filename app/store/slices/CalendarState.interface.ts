import type { NullableRef } from "@/app/types";
import type {
  CalendarDate,
  CalendarView,
} from "@/app/types";

export interface CalendarState {
  anchor: NullableRef<CalendarDate>;
  selectedView: CalendarView;
  preferenceError: NullableRef<string>;
}
