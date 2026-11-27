import type { MonthCalendarDay } from "../models/MonthCalendarDay.interface";

export const PREVIOUS_HREF =
  "/operations/maintenance?month=2026-10";

export const CALENDAR_DAYS: MonthCalendarDay[] = [
  {
    day: 1,
    href: "/operations/maintenance?day=2026-11-01",
    isFuture: false,
    isSelected: true,
    isToday: false,
    isoDate: "2026-11-01",
    label: "1 nov, 1 trabajo",
    marks: [{ count: 1, kind: "job" }],
  },
  {
    day: 2,
    href: "/operations/maintenance?day=2026-11-02",
    isFuture: true,
    isSelected: false,
    isToday: false,
    isoDate: "2026-11-02",
    label: "2 nov",
    marks: [],
  },
];
