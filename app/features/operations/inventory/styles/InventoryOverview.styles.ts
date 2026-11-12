export const INVENTORY_OVERVIEW_WRAPPER_CLASS =
  "mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-8";

export const INVENTORY_OVERVIEW_HEADER_CLASS =
  "flex flex-col gap-3 border-b border-outline/70 pb-4";

export const INVENTORY_OVERVIEW_TITLE_CLASS =
  "text-headline-lg-mobile text-on-background md:text-headline-lg";

export const INVENTORY_OVERVIEW_DESCRIPTION_CLASS =
  "max-w-2xl text-body-base text-on-surface-variant";

export const INVENTORY_ALERT_LIST_CLASS =
  "m-0 flex list-none flex-col gap-3 p-0";

export const INVENTORY_ALERT_LINK_CLASS =
  "flex min-h-11 flex-col gap-1 rounded-xl border border-error/60 bg-error/10 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const INVENTORY_ALERT_NAME_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_ALERT_DETAIL_CLASS =
  "text-body-md text-on-surface";
export const INVENTORY_OVERVIEW_COUNT_LINK_CLASS =
  "inline-flex min-h-11 w-fit items-center rounded-lg border border-outline px-4 text-body-md text-on-surface";

export const INVENTORY_FILTERS_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline p-3 sm:flex-row sm:items-end";

export const INVENTORY_FILTER_FIELD_CLASS =
  "flex flex-1 flex-col gap-1 text-body-sm uppercase tracking-wide text-on-surface-variant";

export const INVENTORY_FILTER_CONTROL_CLASS =
  "min-h-11 w-full rounded-lg border border-outline bg-surface-container px-3 text-body-md normal-case tracking-normal text-on-surface placeholder:text-on-surface-variant focus-visible:outline-2 focus-visible:outline-primary";

export const INVENTORY_FILTER_SUBMIT_CLASS =
  "min-h-11 rounded-lg bg-primary px-5 text-body-md font-semibold text-on-primary hover:bg-primary-container hover:text-on-primary-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const INVENTORY_TABLE_WRAPPER_CLASS =
  "overflow-x-auto rounded-xl border border-outline";

export const INVENTORY_TABLE_CLASS =
  "w-full min-w-[34rem] border-collapse text-left";

export const INVENTORY_TABLE_HEAD_CELL_CLASS =
  "px-3 py-3 text-body-sm font-semibold uppercase tracking-wide text-on-surface-variant";

export const INVENTORY_TABLE_NUMBER_HEAD_CLASS =
  "px-3 py-3 text-center text-body-sm font-semibold uppercase tracking-wide text-on-surface-variant";

export const INVENTORY_TABLE_ROW_CLASS =
  "border-t border-outline/60 hover:bg-surface-container/60";

export const INVENTORY_TABLE_CELL_CLASS =
  "px-3 py-3 text-body-md text-on-surface-variant";

export const INVENTORY_TABLE_NAME_LINK_CLASS =
  "text-body-md font-semibold text-on-surface underline-offset-4 hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary";

export const INVENTORY_TABLE_NUMBER_CELL_CLASS =
  "px-3 py-3 text-center";

export const INVENTORY_TABLE_CHIP_CLASS = {
  available:
    "inline-flex min-w-9 justify-center rounded-full bg-primary/20 px-2 py-1 text-body-md font-semibold text-on-surface",
  damaged:
    "inline-flex min-w-9 justify-center rounded-full bg-error/25 px-2 py-1 text-body-md font-semibold text-on-surface",
  neutral:
    "inline-flex min-w-9 justify-center rounded-full border border-outline px-2 py-1 text-body-md text-on-surface-variant",
} as const;

export const INVENTORY_OVERVIEW_SECTION_CLASS =
  "flex flex-col gap-4";

export const INVENTORY_OVERVIEW_SECTION_TITLE_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_CATEGORY_LIST_CLASS =
  "[&>ul]:list-none [&>ul]:space-y-3 [&>ul]:p-0";

export const INVENTORY_CATEGORY_LINK_CLASS =
  "block min-h-11 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const INVENTORY_CATEGORY_CARD_CLASS =
  "flex flex-col gap-4 rounded-lg border border-outline/70 bg-surface-container p-4 shadow-sm";

export const INVENTORY_CATEGORY_META_CLASS =
  "flex items-center justify-between gap-3";

export const INVENTORY_CATEGORY_NAME_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_CATEGORY_TRACKING_CLASS =
  "text-label-mono uppercase tracking-wide text-on-surface-variant";
