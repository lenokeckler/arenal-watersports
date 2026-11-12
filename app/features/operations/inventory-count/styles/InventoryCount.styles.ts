import {
  INVENTORY_COUNT_RESULT,
  type InventoryCountResult,
} from "../constants/InventoryCount.constants";

export const INVENTORY_COUNT_PAGE_CLASS =
  "mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6";

export const INVENTORY_COUNT_HEADING_CLASS =
  "text-headline-lg-mobile text-on-surface md:text-headline-lg";

export const INVENTORY_COUNT_FORM_CLASS =
  "flex flex-col gap-md";

export const INVENTORY_COUNT_NOTE_CLASS =
  "text-body-sm text-on-surface-variant";

export const INVENTORY_COUNT_SECTION_CLASS =
  "flex flex-col gap-3 rounded-xl border border-outline p-4";

export const INVENTORY_COUNT_SECTION_TITLE_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_COUNT_QUANTITY_GRID_CLASS =
  "grid grid-cols-1 gap-md sm:grid-cols-3";

export const INVENTORY_COUNT_STEP_PROGRESS_CLASS =
  "text-body-md text-on-surface-variant";

export const INVENTORY_COUNT_STEP_NAV_CLASS =
  "flex flex-wrap gap-3";

export const INVENTORY_COUNT_STEP_BUTTON_CLASS =
  "min-h-11 flex-1 rounded-lg border border-outline px-4 text-body-md text-on-surface";

export const INVENTORY_COUNT_ERROR_CLASS =
  "rounded-xl border border-error/60 bg-error/10 px-4 py-3 text-body-base text-on-surface";

export const INVENTORY_COUNT_SUCCESS_CLASS =
  "rounded-xl border border-outline px-4 py-3 text-body-base text-on-surface";

export const INVENTORY_COUNT_RESULT_CLASS: Record<
  InventoryCountResult,
  string
> = {
  [INVENTORY_COUNT_RESULT.FAILED]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.INCOMPLETE]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.INVALID]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.NOT_ALLOWED]:
    INVENTORY_COUNT_ERROR_CLASS,
  [INVENTORY_COUNT_RESULT.RECORDED]:
    INVENTORY_COUNT_SUCCESS_CLASS,
};
