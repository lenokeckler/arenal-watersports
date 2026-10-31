import type { CalendarDate } from "@/app/types";
import type { CalendarHeatLevel } from "../constants/CalendarHeatLevel.constants";

export interface CalendarDateSelection {
  getHeatLevel: (date: CalendarDate) => CalendarHeatLevel;
  onSelect: (date: CalendarDate) => void;
  selectedDate?: CalendarDate;
}
