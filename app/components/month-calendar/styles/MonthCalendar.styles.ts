import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import type { CalendarDayState } from "../models/CalendarDayState.interface";
import type { CalendarMark } from "../models/CalendarMark.type";

export const CALENDAR_CLASS =
  "flex flex-col gap-2 rounded-2xl border border-outline-variant/60 bg-surface-container/80 p-2 sm:p-3";

export const CALENDAR_HEADER_CLASS =
  "grid grid-cols-[3rem_1fr_3rem] items-center text-center";

export const CALENDAR_MONTH_CLASS =
  "text-title-md font-semibold text-on-surface";

export const CALENDAR_ARROW_CLASS =
  "inline-flex min-h-11 items-center justify-center rounded-lg text-title-lg text-primary hover:bg-on-surface/10 focus-visible:outline-2 focus-visible:outline-primary";

export const CALENDAR_ARROW_OFF_CLASS =
  "inline-flex min-h-11 items-center justify-center text-title-lg text-on-surface-variant/40";

export const CALENDAR_GRID_CLASS = "grid grid-cols-7 gap-1";

export const CALENDAR_WEEKDAY_CLASS =
  "text-center text-xs font-semibold text-on-surface-variant";

const CALENDAR_DAY_CLASS =
  "flex min-h-14 min-w-0 flex-col items-center justify-start gap-1 rounded-lg border px-0.5 py-1 text-body-sm lg:min-h-16";

export const CALENDAR_DAY_FUTURE_CLASS = joinClassNames(
  CALENDAR_DAY_CLASS,
  "border-transparent text-on-surface-variant/40"
);

export const resolveCalendarDayClass = ({
  isSelected,
  isToday,
}: CalendarDayState): string =>
  joinClassNames(
    CALENDAR_DAY_CLASS,
    "hover:bg-on-surface/10 focus-visible:outline-2 focus-visible:outline-primary",
    isSelected
      ? "border-primary bg-primary/15"
      : "border-outline-variant/40",
    isToday ? "font-bold text-primary" : "text-on-surface"
  );

export const CALENDAR_MARKS_CLASS =
  "flex flex-col items-center gap-0.5 sm:flex-row sm:gap-1";

const CALENDAR_BADGE_CLASS =
  "inline-flex items-center gap-0.5 rounded-full px-1.5 text-xs font-semibold tabular-nums";

export const CALENDAR_BADGE_CLASSES: Record<
  CalendarMark,
  string
> = {
  damage: joinClassNames(
    CALENDAR_BADGE_CLASS,
    "bg-error/15 text-error"
  ),
  job: joinClassNames(
    CALENDAR_BADGE_CLASS,
    "bg-primary/15 text-primary"
  ),
};

export const CALENDAR_BADGE_ICON_CLASS = "text-xs!";

export const CALENDAR_LEGEND_CLASS =
  "flex justify-center gap-3 text-body-sm text-on-surface-variant";

export const CALENDAR_LEGEND_ITEM_CLASS =
  "flex items-center gap-1";
