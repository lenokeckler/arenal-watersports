import type { ReactNode } from "react";
import type { CalendarPeriod } from "./CalendarPeriod.interface";

export type CalendarPeriodContent = (
  period: CalendarPeriod
) => ReactNode;
