import type { ReservationExtraTimeSource } from "../models/ReservationExtraTimeSource.type";
import { RESERVATION_EXTRA_TIME_SOURCE as SOURCE } from "../constants/ReservationExtraTimeSource.constants";

export const RESERVATION_EXTRA_TIME_MAIN_CLASS =
  "min-h-screen bg-background text-on-background";

export const RESERVATION_EXTRA_TIME_PAGE_CLASS =
  "mx-auto flex w-full max-w-2xl flex-col gap-5 px-gutter py-6 pb-28 md:gap-6 md:py-10 md:pb-10";

export const RESERVATION_EXTRA_TIME_HEADER_CLASS =
  "flex flex-col gap-2";

export const RESERVATION_EXTRA_TIME_BACK_CLASS =
  "-ml-3 inline-flex min-h-11 items-center justify-start self-start px-3 text-primary";

export const RESERVATION_EXTRA_TIME_TITLE_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const RESERVATION_EXTRA_TIME_SUBTITLE_CLASS =
  "break-words text-base text-on-surface-variant";

export const RESERVATION_EXTRA_TIME_CARD_CLASS =
  "rounded-2xl border border-outline-variant/60 bg-surface-container/80 p-4 shadow-xl shadow-black/20 backdrop-blur md:rounded-3xl md:p-8";

export const RESERVATION_EXTRA_TIME_GROUPS_CLASS =
  "space-y-3 rounded-xl bg-surface-container-low/70 px-4 py-4";

export const RESERVATION_EXTRA_TIME_GROUPS_HEADING_CLASS =
  "text-base font-semibold text-on-surface";

export const RESERVATION_EXTRA_TIME_GROUP_LIST_CLASS =
  "divide-y divide-outline-variant/40";

export const RESERVATION_EXTRA_TIME_GROUP_CLASS =
  "space-y-2 py-3 first:pt-0";

export const RESERVATION_EXTRA_TIME_GROUP_HEAD_CLASS =
  "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1";

export const RESERVATION_EXTRA_TIME_GROUP_NAME_CLASS =
  "break-words font-semibold text-on-surface";

export const RESERVATION_EXTRA_TIME_GROUP_MINUTES_CLASS =
  "text-lg font-semibold tabular-nums text-on-surface";

export const RESERVATION_EXTRA_TIME_TIMES_CLASS =
  "grid grid-cols-3 gap-2";

export const RESERVATION_EXTRA_TIME_TERM_CLASS =
  "text-xs text-on-surface-variant";

export const RESERVATION_EXTRA_TIME_DEFINITION_CLASS =
  "text-sm font-semibold tabular-nums text-on-surface";

export const RESERVATION_EXTRA_TIME_TOTAL_CLASS =
  "flex items-baseline justify-between gap-3 border-t border-outline-variant/50 pt-3";

export const RESERVATION_EXTRA_TIME_TOTAL_LABEL_CLASS =
  "font-semibold text-on-surface";

export const RESERVATION_EXTRA_TIME_TOTAL_VALUE_CLASS =
  "text-xl font-bold tabular-nums text-primary";

export const RESERVATION_EXTRA_TIME_STACK_CLASS =
  "space-y-4 text-on-surface";

export const RESERVATION_EXTRA_TIME_DETAILS_CLASS =
  "grid grid-cols-1 gap-3";

export const RESERVATION_EXTRA_TIME_DETAIL_TERM_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_EXTRA_TIME_DETAIL_VALUE_CLASS =
  "break-words text-base font-semibold tabular-nums text-on-surface";

export const RESERVATION_EXTRA_TIME_LOCKED_CLASS =
  "space-y-1 rounded-xl border border-primary/40 bg-primary/10 px-4 py-3 text-on-surface";

export const RESERVATION_EXTRA_TIME_LOCKED_TITLE_CLASS =
  "font-semibold";

export const RESERVATION_EXTRA_TIME_DETAIL_LINK_CLASS =
  "inline-flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-6 font-semibold text-on-primary transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:w-auto md:min-w-56";

const SOURCE_BADGE_BASE_CLASS =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold";

export const RESERVATION_EXTRA_TIME_SOURCE_BADGE_CLASS: Record<
  ReservationExtraTimeSource,
  string
> = {
  [SOURCE.EXTENDED]: `${SOURCE_BADGE_BASE_CLASS} border-primary/50 bg-primary/10 text-primary`,
  [SOURCE.ON_TIME]: `${SOURCE_BADGE_BASE_CLASS} border-outline-variant text-on-surface-variant`,
  [SOURCE.OVERDUE]: `${SOURCE_BADGE_BASE_CLASS} border-card-tint-overdue-border bg-card-tint-overdue-bg text-on-surface`,
};
