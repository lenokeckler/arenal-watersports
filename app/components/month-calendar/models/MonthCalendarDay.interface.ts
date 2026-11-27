import type { MonthDay } from "@/app/utils/equipment-months/models/MonthDay.interface";
import type { CalendarMarkCount } from "./CalendarMarkCount.interface";

export interface MonthCalendarDay extends MonthDay {
  href: string;
  isSelected: boolean;
  label: string;
  marks: CalendarMarkCount[];
}
