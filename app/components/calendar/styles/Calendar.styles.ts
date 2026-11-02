import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import {
  CALENDAR_HEAT_LEVEL,
  type CalendarHeatLevel,
} from "../constants/CalendarHeatLevel.constants";

export const CALENDAR_ROOT_CLASS =
  "mx-auto w-full max-w-7xl space-y-4 p-4 text-on-surface sm:space-y-6 md:p-8";
export const CALENDAR_TITLE_CLASS =
  "text-headline-lg-mobile font-semibold text-primary md:text-headline-lg";
export const CALENDAR_TOOLBAR_CLASS =
  "space-y-4 rounded-xl border border-outline-variant bg-surface-container-low/80 p-4 shadow-lg backdrop-blur-xl sm:space-y-5 md:p-6";
export const CALENDAR_ACTIONS_CLASS =
  "mx-auto grid w-full max-w-[24rem] grid-cols-3 gap-2";
export const CALENDAR_PERIOD_TITLE_SR_ONLY_CLASS =
  "sr-only";
export const CALENDAR_VIEW_GROUP_CLASS =
  "grid w-full auto-cols-fr grid-flow-col gap-1 rounded-lg border border-outline-variant bg-surface-container-low p-1 shadow-inner";
export const CALENDAR_BUTTON_CLASS =
  "min-h-11 min-w-0 w-full rounded-md px-2 font-semibold text-on-surface-variant transition-colors hover:bg-surface-variant/30 hover:text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:px-4";
export const CALENDAR_SELECTED_CLASS =
  "bg-primary-container/20 text-primary shadow-[inset_0_0_10px_var(--glow-primary)]";
export const CALENDAR_UNSELECTED_CLASS =
  "text-on-surface-variant";
export const CALENDAR_DAYS_CLASS =
  "grid gap-3 md:grid-cols-7";
export const CALENDAR_WEEK_DAY_COLUMN_WIDTH_CLASS =
  "auto-cols-[minmax(14rem,1fr)]";
export const CALENDAR_WEEK_DAYS_CLASS = `grid w-full min-w-0 grid-flow-col ${CALENDAR_WEEK_DAY_COLUMN_WIDTH_CLASS} gap-3 overflow-x-auto pb-2 lg:grid-flow-row lg:grid-cols-7 lg:overflow-x-visible`;
export const CALENDAR_SINGLE_DAY_CLASS = "grid gap-3";
export const CALENDAR_DAY_CLASS =
  "min-h-32 min-w-0 rounded-xl border border-outline-variant bg-surface-container-high/70 p-4 shadow-lg backdrop-blur-xl transition-colors hover:bg-surface-container-high/90";
export const CALENDAR_MONTH_CLASS =
  "space-y-3 rounded-xl border border-outline-variant bg-surface-container-high/70 p-4 shadow-lg backdrop-blur-xl md:p-5";
export const CALENDAR_MONTH_SELECT_BUTTON_CLASS =
  "flex min-h-11 w-full items-center rounded-md px-2 text-left text-sm font-semibold text-on-surface hover:bg-surface-variant/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const CALENDAR_MONTH_SELECTED_CLASS =
  "outline outline-2 outline-primary/40";
export const CALENDAR_CELL_SELECT_CLASS =
  "cursor-pointer hover:bg-surface-variant/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
export const CALENDAR_CELL_SELECTED_CLASS =
  "outline outline-2 outline-primary/50";
export const CALENDAR_HEAT_GREEN_CLASS =
  "bg-primary-container/15 ring-2 ring-inset ring-primary/55 shadow-md shadow-primary/20";
export const CALENDAR_HEAT_ORANGE_CLASS =
  "bg-secondary-container/15 ring-2 ring-inset ring-secondary/65 shadow-md shadow-secondary/20";
export const CALENDAR_HEAT_RED_CLASS =
  "bg-error-container/15 ring-2 ring-inset ring-error/65 shadow-md shadow-error/20";
export const CALENDAR_HEAT_COUNT_BASE_CLASS =
  "rounded-full px-1.5 text-xs font-bold leading-none";
export const CALENDAR_HEAT_COUNT_GREEN_CLASS =
  "bg-primary-container/40 text-primary";
export const CALENDAR_HEAT_COUNT_ORANGE_CLASS =
  "bg-secondary-container/50 text-secondary";
export const CALENDAR_HEAT_COUNT_RED_CLASS =
  "bg-error-container/50 text-error";
export const CALENDAR_GRID_CLASS = "grid grid-cols-7 gap-1";
export const CALENDAR_CELL_CLASS =
  "flex min-h-12 min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg text-sm tabular-nums";
export const CALENDAR_TODAY_CLASS =
  "bg-primary-container/20 font-semibold text-primary outline outline-1 outline-primary/40";
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

const CALENDAR_HEAT_CLASS: Record<
  CalendarHeatLevel,
  string
> = {
  [CALENDAR_HEAT_LEVEL.NONE]: "",
  [CALENDAR_HEAT_LEVEL.GREEN]: CALENDAR_HEAT_GREEN_CLASS,
  [CALENDAR_HEAT_LEVEL.ORANGE]: CALENDAR_HEAT_ORANGE_CLASS,
  [CALENDAR_HEAT_LEVEL.RED]: CALENDAR_HEAT_RED_CLASS,
};

const CALENDAR_HEAT_COUNT_BY_LEVEL: Record<
  CalendarHeatLevel,
  string
> = {
  [CALENDAR_HEAT_LEVEL.NONE]: "",
  [CALENDAR_HEAT_LEVEL.GREEN]:
    CALENDAR_HEAT_COUNT_GREEN_CLASS,
  [CALENDAR_HEAT_LEVEL.ORANGE]:
    CALENDAR_HEAT_COUNT_ORANGE_CLASS,
  [CALENDAR_HEAT_LEVEL.RED]: CALENDAR_HEAT_COUNT_RED_CLASS,
};

export const resolveCalendarHeatCountClass = (
  heatLevel: CalendarHeatLevel
): string =>
  joinClassNames(
    CALENDAR_HEAT_COUNT_BASE_CLASS,
    CALENDAR_HEAT_COUNT_BY_LEVEL[heatLevel]
  );

export const resolveCalendarCellSelectionClass = (
  baseClass: string,
  heatLevel: CalendarHeatLevel,
  selected: boolean
): string =>
  joinClassNames(
    baseClass,
    CALENDAR_HEAT_CLASS[heatLevel],
    CALENDAR_CELL_SELECT_CLASS,
    selected && CALENDAR_CELL_SELECTED_CLASS
  );

export const resolveCalendarMonthClass = (
  selected: boolean
): string =>
  joinClassNames(
    CALENDAR_MONTH_CLASS,
    selected && CALENDAR_MONTH_SELECTED_CLASS
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
