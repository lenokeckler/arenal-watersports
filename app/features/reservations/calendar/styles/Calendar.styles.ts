import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CALENDAR_ROOT_CLASS =
  "mx-auto w-full max-w-6xl space-y-6 p-4 text-on-surface md:p-8";
export const CALENDAR_TITLE_CLASS =
  "text-headline-lg-mobile font-semibold md:text-headline-lg";
export const CALENDAR_TOOLBAR_CLASS =
  "flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between";
export const CALENDAR_ACTIONS_CLASS =
  "flex flex-wrap gap-2";
export const CALENDAR_VIEW_GROUP_CLASS =
  "grid w-full grid-cols-4 gap-1 rounded-lg border border-outline-variant/30 bg-surface-container-low/80 p-1 shadow-inner backdrop-blur-md sm:flex sm:w-fit";
export const CALENDAR_BUTTON_CLASS =
  "min-h-11 min-w-0 w-full rounded-md px-2 font-semibold text-on-surface-variant transition-colors hover:bg-surface-variant/30 hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-w-16 sm:w-auto sm:px-4";
export const CALENDAR_SELECTED_CLASS =
  "border border-primary/20 bg-primary-container/20 text-primary shadow-inner";
export const CALENDAR_UNSELECTED_CLASS =
  "text-on-surface-variant";
export const CALENDAR_DAYS_CLASS =
  "grid gap-3 md:grid-cols-7";
export const CALENDAR_SINGLE_DAY_CLASS = "grid gap-3";
export const CALENDAR_DAY_CLASS =
  "min-h-32 rounded-lg border border-outline-variant/30 bg-surface-container-high/70 p-3 shadow-lg backdrop-blur-xl";
export const CALENDAR_MONTH_CLASS =
  "space-y-3 rounded-xl border border-outline-variant/30 bg-surface-container-high/70 p-3 shadow-lg backdrop-blur-xl";
export const CALENDAR_GRID_CLASS = "grid grid-cols-7 gap-1";
export const CALENDAR_CELL_CLASS =
  "flex min-h-12 min-w-0 items-center justify-center rounded text-sm tabular-nums";
export const CALENDAR_TODAY_CLASS =
  "outline-2 outline-primary";
export const CALENDAR_MUTED_CLASS =
  "text-on-surface-variant";
export const CALENDAR_WEEKDAY_CLASS =
  "text-center text-xs text-on-surface-variant";
export const CALENDAR_YEAR_CLASS =
  "grid gap-4 sm:grid-cols-2 lg:grid-cols-3";
export const CALENDAR_ERROR_CLASS = "text-error";

export const resolveCalendarCellClass = (
  today: boolean,
  adjacent: boolean
) =>
  joinClassNames(
    CALENDAR_CELL_CLASS,
    today && CALENDAR_TODAY_CLASS,
    adjacent && CALENDAR_MUTED_CLASS
  );
export const resolveCalendarButtonClass = (
  selected: boolean
) =>
  joinClassNames(
    CALENDAR_BUTTON_CLASS,
    selected
      ? CALENDAR_SELECTED_CLASS
      : CALENDAR_UNSELECTED_CLASS
  );
