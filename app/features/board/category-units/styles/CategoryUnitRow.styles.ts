import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const CATEGORY_UNIT_ROW_MIN_HEIGHT_CLASS =
  "min-h-14";

const ROW_BASE_CLASS = `${CATEGORY_UNIT_ROW_MIN_HEIGHT_CLASS} flex w-full min-w-0 flex-col justify-center gap-sm rounded-xl border px-sm py-sm backdrop-blur-md md:px-md`;

export const CATEGORY_UNIT_ROW_CLASS = `${ROW_BASE_CLASS} border-outline-variant bg-card-tint-neutral-bg`;

export const CATEGORY_UNIT_ROW_OVERDUE_CLASS = `${ROW_BASE_CLASS} border-warning/40 bg-linear-to-r from-warning/15 to-card-tint-neutral-bg`;

export const CATEGORY_UNIT_ROW_SELECTED_CLASS = `${ROW_BASE_CLASS} border-primary bg-primary/10 ring-2 ring-primary`;

export const resolveCategoryUnitRowClass = (
  isOverdue: boolean,
  isSelected = false
): string => {
  if (isSelected) {
    return CATEGORY_UNIT_ROW_SELECTED_CLASS;
  }

  return isOverdue
    ? CATEGORY_UNIT_ROW_OVERDUE_CLASS
    : CATEGORY_UNIT_ROW_CLASS;
};

export const CATEGORY_UNIT_ROW_TITLE_CLASS =
  "flex min-w-0 items-center gap-sm";

const SELECT_MARK_BASE_CLASS =
  "flex size-6 shrink-0 items-center justify-center rounded-md border-2";

const SELECT_MARK_OFF_CLASS = `${SELECT_MARK_BASE_CLASS} border-outline text-transparent`;

const SELECT_MARK_ON_CLASS = `${SELECT_MARK_BASE_CLASS} border-primary bg-primary text-on-primary`;

export const resolveCategoryUnitSelectMarkClass = (
  isSelected: boolean
): string =>
  isSelected ? SELECT_MARK_ON_CLASS : SELECT_MARK_OFF_CLASS;

export const CATEGORY_UNIT_SELECT_LABEL_CLASS =
  "relative flex w-full min-w-0 cursor-pointer rounded-xl focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const CATEGORY_UNIT_SELECT_INPUT_CLASS = "sr-only";

export const CATEGORY_UNIT_ROW_HEADER_CLASS =
  "flex flex-wrap items-center justify-between gap-sm";

export const CATEGORY_UNIT_ROW_CODE_CLASS =
  "break-words text-title-md font-semibold text-on-surface";

export const CATEGORY_UNIT_DETAIL_CLASS =
  "flex flex-col gap-1 border-t border-outline-variant pt-sm";

export const CATEGORY_UNIT_RETURN_CLASS =
  "text-body-base font-bold text-tertiary";

export const CATEGORY_UNIT_RETURN_OVERDUE_CLASS =
  "text-body-base font-bold text-warning";

export const resolveCategoryUnitReturnClass = (
  isOverdue: boolean
): string =>
  isOverdue
    ? CATEGORY_UNIT_RETURN_OVERDUE_CLASS
    : CATEGORY_UNIT_RETURN_CLASS;

export const CATEGORY_UNIT_ROW_BADGES_CLASS =
  "flex flex-wrap items-center justify-end gap-2";

export const CATEGORY_UNIT_CUSTOMER_CLASS =
  "break-words text-sm text-on-surface-variant";

export const CATEGORY_UNIT_REFERENCE_CLASS =
  "break-words text-sm tabular-nums text-on-surface-variant";

const CHIP_BASE_CLASS =
  "inline-flex items-center gap-xs rounded-full border bg-surface-container-highest/80 px-3 py-1 text-label-mono uppercase";

const DOT_BASE_CLASS = "block size-2 rounded-full";

const CHIP_AVAILABLE_CLASS = `${CHIP_BASE_CLASS} border-primary/30 text-primary`;
const CHIP_OCCUPIED_CLASS = `${CHIP_BASE_CLASS} border-tertiary/30 text-tertiary`;
const CHIP_MAINTENANCE_CLASS = `${CHIP_BASE_CLASS} border-outline/30 text-outline`;
export const CATEGORY_UNIT_OVERDUE_CHIP_CLASS = `${CHIP_BASE_CLASS} border-warning/40 text-warning`;

const CHIP_DAMAGED_CLASS = `${CHIP_BASE_CLASS} border-error/30 text-error`;

const DOT_AVAILABLE_CLASS = `${DOT_BASE_CLASS} bg-primary`;
const DOT_OCCUPIED_CLASS = `${DOT_BASE_CLASS} bg-tertiary`;
const DOT_MAINTENANCE_CLASS = `${DOT_BASE_CLASS} bg-outline`;
const DOT_DAMAGED_CLASS = `${DOT_BASE_CLASS} bg-error`;

export const CATEGORY_UNIT_STATUS_CHIP_CLASS: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]: CHIP_AVAILABLE_CLASS,
  [INVENTORY_UNIT_STATUS.DAMAGED]: CHIP_DAMAGED_CLASS,
  [INVENTORY_UNIT_STATUS.IN_MAINTENANCE]:
    CHIP_MAINTENANCE_CLASS,
  [INVENTORY_UNIT_STATUS.IN_REPAIR]: CHIP_MAINTENANCE_CLASS,
  [INVENTORY_UNIT_STATUS.OCCUPIED]: CHIP_OCCUPIED_CLASS,
};

export const CATEGORY_UNIT_STATUS_DOT_CLASS: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]: DOT_AVAILABLE_CLASS,
  [INVENTORY_UNIT_STATUS.DAMAGED]: DOT_DAMAGED_CLASS,
  [INVENTORY_UNIT_STATUS.IN_MAINTENANCE]:
    DOT_MAINTENANCE_CLASS,
  [INVENTORY_UNIT_STATUS.IN_REPAIR]: DOT_MAINTENANCE_CLASS,
  [INVENTORY_UNIT_STATUS.OCCUPIED]: DOT_OCCUPIED_CLASS,
};
