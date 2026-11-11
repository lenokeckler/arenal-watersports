export const CATEGORY_UNITS_PAGE_CLASS =
  "mx-auto flex w-full max-w-6xl flex-col gap-md px-margin-mobile py-md md:px-margin-desktop md:py-lg";

export const CATEGORY_UNITS_HEADER_CLASS =
  "flex flex-col items-start gap-xs";

export const CATEGORY_UNITS_BACK_LINK_CLASS =
  "inline-flex min-h-11 items-center gap-xs rounded-lg text-button font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const CATEGORY_UNITS_TITLE_CLASS =
  "break-words font-sans text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const CATEGORY_UNITS_SUBTITLE_CLASS =
  "max-w-prose text-body-base text-on-surface-variant";

export const CATEGORY_UNITS_LIST_CLASS =
  "grid grid-cols-1 items-start gap-2 md:grid-cols-2";

export const CATEGORY_UNITS_LIST_ITEM_CLASS =
  "flex min-w-0";

export const CATEGORY_UNITS_DISPATCH_BAR_CLASS =
  "fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 flex items-center justify-between gap-sm border-t border-outline-variant bg-surface-container-high/95 px-margin-mobile py-sm backdrop-blur-xl";

export const CATEGORY_UNITS_DISPATCH_BAR_COUNT_CLASS =
  "text-title-md font-semibold text-on-surface";

export const CATEGORY_UNITS_DISPATCH_BAR_ACTIONS_CLASS =
  "flex items-center gap-sm";

export const CATEGORY_UNITS_DISPATCH_SPACER_CLASS = "h-20";

export const CATEGORY_UNITS_PICKER_LIST_CLASS =
  "flex flex-col gap-sm";

export const CATEGORY_UNITS_PICKER_OPTION_CLASS =
  "flex flex-col gap-1 rounded-xl border border-outline-variant/60 bg-surface-container/80 px-4 py-3";

export const CATEGORY_UNITS_PICKER_TITLE_CLASS =
  "text-title-md font-semibold text-on-surface";

export const CATEGORY_UNITS_PICKER_NOTE_CLASS =
  "text-body-sm text-on-surface-variant";

export const CATEGORY_UNITS_PICKER_ALERT_CLASS =
  "rounded-xl border border-error/60 bg-error/10 px-4 py-3 text-body-base text-on-surface";

export const CATEGORY_UNITS_PICKER_ACTION_CLASS =
  "mt-2 self-start";

export const CATEGORY_UNITS_PAGINATION_CLASS =
  "grid grid-cols-[1fr_auto_1fr] items-center gap-sm";

const CATEGORY_UNITS_PAGINATION_LINK_CLASS =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-outline-variant bg-card-tint-neutral-bg px-md text-button font-semibold text-on-surface hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const CATEGORY_UNITS_PAGINATION_PREVIOUS_CLASS = `${CATEGORY_UNITS_PAGINATION_LINK_CLASS} col-start-1 justify-self-start`;

export const CATEGORY_UNITS_PAGINATION_NEXT_CLASS = `${CATEGORY_UNITS_PAGINATION_LINK_CLASS} col-start-3 justify-self-end`;

export const CATEGORY_UNITS_PAGINATION_STATUS_CLASS =
  "col-start-2 text-center text-body-base tabular-nums text-on-surface-variant";
