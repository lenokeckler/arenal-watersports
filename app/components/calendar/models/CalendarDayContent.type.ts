import type { ReactNode } from "react";
import type { CalendarDate } from "@/app/types";

export type CalendarDayContent = (
  date: CalendarDate
) => ReactNode;
