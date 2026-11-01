import type { CalendarPeriod } from "./CalendarPeriod.interface";

export type CalendarPeriodChangeHandler = (
  period: CalendarPeriod
) => void;
