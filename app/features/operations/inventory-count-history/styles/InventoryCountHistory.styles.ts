export const INVENTORY_COUNT_HISTORY_PAGE_CLASS =
  "mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6";

export const INVENTORY_COUNT_HISTORY_HEADING_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const INVENTORY_COUNT_HISTORY_NOTE_CLASS =
  "text-body-base text-on-surface-variant";

export const INVENTORY_COUNT_HISTORY_ERROR_CLASS =
  "rounded-xl border border-error/60 bg-error/10 px-4 py-3 text-body-base text-on-surface";

export const INVENTORY_COUNT_HISTORY_LINK_CLASS =
  "inline-flex min-h-11 w-fit items-center rounded-lg border border-outline px-4 text-body-md text-on-surface";

export const INVENTORY_COUNT_HISTORY_LIST_CLASS =
  "m-0 flex list-none flex-col gap-3 p-0";

export const INVENTORY_COUNT_HISTORY_ITEM_CLASS =
  "flex min-h-11 flex-col gap-1 rounded-xl border border-outline p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const INVENTORY_COUNT_HISTORY_ITEM_DATE_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_COUNT_HISTORY_ITEM_META_CLASS =
  "text-body-md text-on-surface-variant";

export const INVENTORY_COUNT_HISTORY_DIFFERENCES_CLASS = {
  clean:
    "w-fit rounded-full bg-primary/20 px-3 py-1 text-body-md font-semibold text-on-surface",
  different:
    "w-fit rounded-full border border-error/60 bg-error/10 px-3 py-1 text-body-md font-semibold text-on-surface",
} as const;

export const INVENTORY_COUNT_HISTORY_SECTION_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline p-4";

export const INVENTORY_COUNT_HISTORY_SECTION_TITLE_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_COUNT_HISTORY_DIFFERENCE_CLASS =
  "text-body-base text-on-surface";

export const INVENTORY_COUNT_HISTORY_CONTENT_LIST_CLASS =
  "flex flex-col gap-2";

export const INVENTORY_COUNT_HISTORY_DETAILS_CLASS =
  "rounded-xl border border-outline";

export const INVENTORY_COUNT_HISTORY_SUMMARY_ROW_CLASS =
  "flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-title-md text-on-surface marker:content-none focus-visible:outline-2 focus-visible:outline-primary";

export const INVENTORY_COUNT_HISTORY_CATEGORY_BADGE_CLASS =
  {
    clean:
      "shrink-0 rounded-full bg-primary/20 px-3 py-1 text-body-sm font-semibold text-on-surface",
    different:
      "shrink-0 rounded-full border border-error/60 bg-error/10 px-3 py-1 text-body-sm font-semibold text-on-surface",
  } as const;

export const INVENTORY_COUNT_HISTORY_LINES_CLASS =
  "m-0 flex list-none flex-col gap-1 border-t border-outline/60 p-0 px-4 py-2";

export const INVENTORY_COUNT_HISTORY_LINE_CLASS = {
  clean:
    "flex items-center justify-between gap-3 py-2 text-body-md text-on-surface",
  different:
    "flex items-center justify-between gap-3 rounded-lg bg-error/10 px-2 py-2 text-body-md text-on-surface",
} as const;

export const INVENTORY_COUNT_HISTORY_LINE_META_CLASS =
  "text-body-sm text-on-surface-variant";

export const INVENTORY_COUNT_HISTORY_CARD_SUMMARY_CLASS =
  "text-body-md text-on-surface-variant";
