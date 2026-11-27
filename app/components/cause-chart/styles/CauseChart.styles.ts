import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CAUSE_CHART_CLASS = "flex flex-col gap-1";

const CAUSE_CHART_ROW_CLASS =
  "grid min-h-11 grid-cols-[8.5rem_1fr_2rem] items-center gap-2 rounded-lg px-2 text-body-base text-on-surface focus-visible:outline-2 focus-visible:outline-primary hover:bg-on-surface/10";

export const resolveCauseChartRowClass = (
  isCurrent: boolean
): string =>
  joinClassNames(
    CAUSE_CHART_ROW_CLASS,
    isCurrent ? "bg-primary/10 font-semibold" : undefined
  );

export const CAUSE_CHART_TRACK_CLASS = "block h-3";

export const CAUSE_CHART_BAR_CLASS =
  "block h-full min-w-0 rounded-r bg-primary";

export const CAUSE_CHART_VALUE_CLASS =
  "text-right font-semibold tabular-nums";
