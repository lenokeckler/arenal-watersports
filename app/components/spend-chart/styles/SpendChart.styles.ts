import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const SPEND_CHART_CLASS =
  "grid grid-cols-6 items-end gap-1";

export const SPEND_CHART_COLUMN_CLASS =
  "flex h-44 flex-col justify-end gap-1 rounded-lg px-0.5 pb-1 text-center focus-visible:outline-2 focus-visible:outline-primary hover:bg-on-surface/10";

export const SPEND_CHART_PLOT_CLASS =
  "flex flex-1 flex-col justify-end border-b border-outline-variant";

export const resolveSpendChartBarClass = (
  isCurrent: boolean
): string =>
  joinClassNames(
    "mx-auto block w-3/5 max-w-10 rounded-t",
    isCurrent ? "bg-primary" : "bg-primary/55"
  );

export const resolveSpendChartMonthClass = (
  isCurrent: boolean
): string =>
  joinClassNames(
    "block text-xs",
    isCurrent
      ? "font-bold text-on-surface"
      : "text-on-surface-variant"
  );
