export const DAMAGE_REPORTS_CLASS =
  "mx-auto flex w-full max-w-2xl flex-col gap-5 px-4 py-6 lg:max-w-5xl";

export const DAMAGE_REPORTS_MESSAGE_CLASS =
  "rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3 text-body-base text-on-surface";

export const DAMAGE_REPORTS_SAVED_CLASS =
  "rounded-xl border border-primary/60 bg-primary/10 px-4 py-3 text-body-base text-on-surface";

export const DAMAGE_REPORTS_SPLIT_CLASS =
  "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:items-start";

export const DAMAGE_REPORTS_COLUMN_CLASS =
  "flex min-w-0 flex-col gap-4";

export const DAMAGE_REPORTS_SECTION_HEADING_CLASS =
  "text-title-md font-semibold text-on-surface";

export const DAMAGE_REPORTS_HINT_CLASS =
  "text-body-sm text-on-surface-variant";

export const DAMAGE_REPORTS_STATS_CLASS =
  "grid grid-cols-2 gap-3";

export const DAMAGE_REPORTS_STAT_CLASS =
  "flex flex-col rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3";

export const DAMAGE_REPORTS_STAT_VALUE_CLASS =
  "text-headline-lg-mobile font-semibold tabular-nums text-on-surface";

export const DAMAGE_REPORTS_CARD_CLASS =
  "flex flex-col gap-2 rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3";

export const DAMAGE_REPORTS_ROW_CLASS =
  "flex items-center justify-between gap-2";

export const DAMAGE_REPORTS_CODE_CLASS =
  "text-title-md font-semibold text-on-surface";

export const DAMAGE_REPORTS_TEXT_CLASS =
  "text-body-base wrap-anywhere text-on-surface";

export const DAMAGE_REPORTS_ACTION_CLASS =
  "inline-flex min-h-11 items-center rounded-xl border border-outline-variant px-4 text-body-base font-semibold text-primary hover:bg-on-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const DAMAGE_REPORTS_DAY_TOTAL_CLASS =
  "text-body-base font-semibold text-on-surface";

export const DAMAGE_REPORTS_PENDING_ROW_CLASS =
  "flex min-h-12 items-center justify-between gap-2 rounded-xl border border-error/60 bg-error/10 px-3 hover:bg-error/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const resolveDamageDayTotalClass = (
  hasReports: boolean
): string =>
  hasReports
    ? DAMAGE_REPORTS_DAY_TOTAL_CLASS
    : DAMAGE_REPORTS_HINT_CLASS;

export const DAMAGE_REPORTS_HEADING_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const DAMAGE_REPORTS_UNIT_CLASS =
  "text-title-md font-semibold text-on-surface";

export const DAMAGE_REPORTS_UNIT_DETAIL_CLASS =
  "text-body-base text-on-surface-variant";

export const DAMAGE_REPORTS_LIST_CLASS =
  "flex w-full flex-col gap-3 [&_ul]:list-none";

export const DAMAGE_REPORTS_CARD_HEADING_CLASS =
  "text-title-md font-semibold text-on-surface";

export const DAMAGE_REPORTS_CARD_DETAIL_CLASS =
  "text-body-base text-on-surface-variant";

export const DAMAGE_REPORTS_PAGINATION_CLASS =
  "flex justify-between gap-3 pt-2";

export const DAMAGE_REPORTS_PAGINATION_LINK_CLASS =
  "inline-flex min-h-12 items-center rounded-xl border border-outline-variant bg-surface-container/80 px-4 text-on-surface transition-colors hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const DAMAGE_REPORTS_PAGINATION_NEXT_CLASS = `${DAMAGE_REPORTS_PAGINATION_LINK_CLASS} ml-auto`;
