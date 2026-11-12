import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const INVENTORY_CATEGORY_WRAPPER_CLASS =
  "mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 py-6 md:px-8";

export const INVENTORY_CATEGORY_HEADER_CLASS =
  "flex flex-col gap-4 border-b border-outline/70 pb-4";

export const INVENTORY_CATEGORY_HEADER_ROW_CLASS =
  "flex flex-wrap items-center justify-between gap-3";

export const INVENTORY_CATEGORY_TITLE_CLASS =
  "text-headline-lg-mobile text-on-background md:text-headline-lg";

export const INVENTORY_CATEGORY_BACK_LINK_CLASS =
  "inline-flex min-h-11 items-center rounded-lg text-button text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const INVENTORY_CATEGORY_SECTION_CLASS =
  "flex flex-col gap-4";

export const INVENTORY_CATEGORY_SECTION_TITLE_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_UNIT_LIST_CLASS =
  "[&>ul]:list-none [&>ul]:space-y-2 [&>ul]:p-0";

export const INVENTORY_UNIT_ROW_CLASS =
  "flex min-h-11 flex-wrap items-center justify-between gap-3 rounded-lg border border-outline/60 bg-surface-container-low px-3 py-2";

export const INVENTORY_UNIT_CONDITION_ACTIONS_CLASS =
  "flex w-full flex-wrap gap-2";

export const INVENTORY_UNIT_CONDITION_BUTTON_CLASS =
  "min-h-11 rounded-lg border border-outline px-3 text-body-md text-on-surface";

export const INVENTORY_UNIT_CONDITION_MESSAGE_CLASS =
  "w-full text-body-md text-on-surface-variant";

export const INVENTORY_UNIT_CODE_CLASS =
  "font-mono text-sm text-on-surface";

export const INVENTORY_STOCK_FORM_CLASS =
  "grid gap-4 rounded-lg border border-outline/60 bg-surface-container-low p-4 md:grid-cols-2";

export const INVENTORY_STOCK_FORM_FIELD_CLASS =
  "min-h-11 w-full rounded-lg border border-outline bg-surface px-3 text-body-md text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const INVENTORY_STOCK_FORM_ACTION_CLASS =
  "flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 text-button text-on-primary disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2";

export const INVENTORY_STOCK_NOTICE_CLASS =
  "text-body-sm text-on-surface-variant";

export const INVENTORY_STOCK_ERROR_CLASS =
  "text-body-sm text-error";

export const resolveInventoryStockMessageClassName = (
  isSuccess: boolean
): string =>
  isSuccess
    ? INVENTORY_STOCK_NOTICE_CLASS
    : INVENTORY_STOCK_ERROR_CLASS;

export const INVENTORY_MOVEMENT_LIST_CLASS = "grid gap-3";

export const INVENTORY_MOVEMENT_CARD_CLASS =
  "grid gap-3 rounded-lg border border-outline/60 bg-surface-container-low p-4";

export const INVENTORY_MOVEMENT_DETAILS_CLASS =
  "grid gap-2 text-body-sm text-on-surface-variant sm:grid-cols-2";

export const INVENTORY_MOVEMENT_CHANGE_CLASS =
  "text-body-sm text-on-surface";

export const INVENTORY_UNIT_STATUS_CLASS: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]:
    "rounded-full border border-card-tint-available-border bg-card-tint-available-bg px-2 py-1 text-label-mono text-on-surface",
  [INVENTORY_UNIT_STATUS.DAMAGED]:
    "rounded-full border border-card-tint-damaged-border bg-card-tint-damaged-bg px-2 py-1 text-label-mono text-on-surface",
  [INVENTORY_UNIT_STATUS.IN_MAINTENANCE]:
    "rounded-full border border-card-tint-maintenance-border bg-card-tint-maintenance-bg px-2 py-1 text-label-mono text-on-surface",
  [INVENTORY_UNIT_STATUS.IN_REPAIR]:
    "rounded-full border border-card-tint-maintenance-border bg-card-tint-maintenance-bg px-2 py-1 text-label-mono text-on-surface",
  [INVENTORY_UNIT_STATUS.OCCUPIED]:
    "rounded-full border border-outline bg-surface-container-high px-2 py-1 text-label-mono text-on-surface",
};
