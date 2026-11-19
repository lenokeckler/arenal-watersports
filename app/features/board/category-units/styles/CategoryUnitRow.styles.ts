import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const CATEGORY_UNIT_ROW_MIN_HEIGHT_CLASS =
  "min-h-14";

const ROW_BASE_CLASS = `${CATEGORY_UNIT_ROW_MIN_HEIGHT_CLASS} relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-xl border-2 shadow-sm backdrop-blur-md`;

export const CATEGORY_UNIT_ROW_CLASS = `${ROW_BASE_CLASS} border-outline-variant bg-card-tint-neutral-bg`;

const ROW_AVAILABLE_CLASS = `${ROW_BASE_CLASS} border-primary/40 bg-card-tint-neutral-bg`;

const ROW_OCCUPIED_CLASS = `${ROW_BASE_CLASS} border-warning/70 bg-card-tint-neutral-bg [box-shadow:0_0_16px_-2px_color-mix(in_oklab,var(--color-warning)_45%,transparent)]`;

const ROW_INACTIVE_CLASS = `${ROW_BASE_CLASS} border-on-surface-variant/50 bg-on-surface-variant/15`;

const ROW_DAMAGED_CLASS = `${ROW_BASE_CLASS} border-error/40 bg-card-tint-neutral-bg`;

export const CATEGORY_UNIT_ROW_OVERDUE_CLASS = `${ROW_BASE_CLASS} border-warning bg-card-tint-neutral-bg [box-shadow:0_0_22px_0_color-mix(in_oklab,var(--color-warning)_60%,transparent)]`;

export const CATEGORY_UNIT_ROW_SELECTED_CLASS = `${ROW_BASE_CLASS} border-primary bg-primary/10 ring-2 ring-primary`;

const CATEGORY_UNIT_ROW_STATUS_CLASS: Record<
  ActiveInventoryUnitStatus,
  string
> = {
  [INVENTORY_UNIT_STATUS.AVAILABLE]: ROW_AVAILABLE_CLASS,
  [INVENTORY_UNIT_STATUS.DAMAGED]: ROW_DAMAGED_CLASS,
  [INVENTORY_UNIT_STATUS.IN_MAINTENANCE]:
    ROW_INACTIVE_CLASS,
  [INVENTORY_UNIT_STATUS.IN_REPAIR]: ROW_INACTIVE_CLASS,
  [INVENTORY_UNIT_STATUS.OCCUPIED]: ROW_OCCUPIED_CLASS,
};

export const resolveCategoryUnitRowClass = (
  status: ActiveInventoryUnitStatus,
  isOverdue: boolean,
  isSelected = false
): string => {
  if (isSelected) {
    return CATEGORY_UNIT_ROW_SELECTED_CLASS;
  }

  return isOverdue
    ? CATEGORY_UNIT_ROW_OVERDUE_CLASS
    : CATEGORY_UNIT_ROW_STATUS_CLASS[status];
};

export const CATEGORY_UNIT_ROW_MEDIA_CLASS =
  "relative aspect-4/3 w-full overflow-hidden bg-linear-to-b from-surface-container-high to-surface-container";

export const CATEGORY_UNIT_ROW_IMAGE_CLASS =
  "absolute inset-0 h-full w-full object-cover";

export const CATEGORY_UNIT_ROW_PLACEHOLDER_CLASS =
  "absolute inset-0 flex items-center justify-center";

export const CATEGORY_UNIT_ROW_PLACEHOLDER_ICON_CLASS =
  "text-6xl text-on-surface-variant/40";

export const CATEGORY_UNIT_ROW_BODY_CLASS =
  "flex min-w-0 flex-1 flex-col gap-sm p-sm";

export const CATEGORY_UNIT_ROW_READINGS_CLASS =
  "mt-auto flex flex-col gap-xs";

export const CATEGORY_UNIT_ROW_USAGE_CLASS =
  "text-body-sm tabular-nums text-on-surface-variant";

export const CATEGORY_UNIT_ROW_TITLE_CLASS =
  "flex min-w-0 items-center gap-sm";

const SELECT_MARK_BASE_CLASS =
  "pointer-events-none absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full border-2 bg-background/70";

const SELECT_MARK_OFF_CLASS = `${SELECT_MARK_BASE_CLASS} border-outline text-transparent`;

const SELECT_MARK_ON_CLASS = `${SELECT_MARK_BASE_CLASS} border-primary bg-primary text-on-primary`;

export const resolveCategoryUnitSelectMarkClass = (
  isSelected: boolean
): string =>
  isSelected ? SELECT_MARK_ON_CLASS : SELECT_MARK_OFF_CLASS;

export const CATEGORY_UNIT_SELECT_LABEL_CLASS =
  "relative flex h-full w-full min-w-0 cursor-pointer rounded-xl focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-primary";

export const CATEGORY_UNIT_SELECT_INPUT_CLASS = "sr-only";

export const CATEGORY_UNIT_ROW_HEADER_CLASS =
  "flex flex-col items-start gap-xs";

export const CATEGORY_UNIT_ROW_CODE_CLASS =
  "break-words text-title-md font-bold text-on-surface";

export const CATEGORY_UNIT_DETAIL_CLASS =
  "flex flex-col gap-1 border-t border-outline-variant/60 pt-sm";

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
  "flex flex-wrap items-center justify-start gap-2";

export const CATEGORY_UNIT_CUSTOMER_CLASS =
  "break-words text-sm text-on-surface-variant";

export const CATEGORY_UNIT_REFERENCE_CLASS =
  "break-words text-sm tabular-nums text-on-surface-variant";

const CHIP_BASE_CLASS =
  "inline-flex items-center gap-xs rounded-full border bg-surface-container-highest/80 px-3 py-1 text-label-mono uppercase";

const DOT_BASE_CLASS = "block size-2 rounded-full";

const CHIP_AVAILABLE_CLASS = `${CHIP_BASE_CLASS} border-primary/30 text-primary`;
const CHIP_OCCUPIED_CLASS = `${CHIP_BASE_CLASS} border-warning/40 text-warning`;
const CHIP_MAINTENANCE_CLASS = `${CHIP_BASE_CLASS} border-on-surface-variant/50 text-on-surface-variant`;

const CHIP_DAMAGED_CLASS = `${CHIP_BASE_CLASS} border-error/30 text-error`;

const DOT_AVAILABLE_CLASS = `${DOT_BASE_CLASS} bg-primary`;
const DOT_OCCUPIED_CLASS = `${DOT_BASE_CLASS} bg-warning`;
const DOT_MAINTENANCE_CLASS = `${DOT_BASE_CLASS} bg-on-surface-variant`;
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

const CATEGORY_UNIT_ROW_IMAGE_DIMMED_CLASS = `${CATEGORY_UNIT_ROW_IMAGE_CLASS} opacity-70`;

const CATEGORY_UNIT_ROW_IMAGE_MUTED_CLASS = `${CATEGORY_UNIT_ROW_IMAGE_CLASS} opacity-60 grayscale`;

export const resolveCategoryUnitImageClass = (
  isDimmed: boolean,
  isMuted: boolean
): string => {
  if (isMuted) {
    return CATEGORY_UNIT_ROW_IMAGE_MUTED_CLASS;
  }

  return isDimmed
    ? CATEGORY_UNIT_ROW_IMAGE_DIMMED_CLASS
    : CATEGORY_UNIT_ROW_IMAGE_CLASS;
};

const OVERLAY_BADGE_BASE_CLASS =
  "inline-flex items-center rounded-full border px-3 py-1 text-label-mono uppercase backdrop-blur-sm";

export const CATEGORY_UNIT_OVERDUE_CHIP_CLASS = `${OVERLAY_BADGE_BASE_CLASS} border-error-container bg-error-container text-on-error-container`;

export const resolveCategoryUnitReturnBadgeClass = (
  isOverdue: boolean
): string =>
  isOverdue
    ? `${OVERLAY_BADGE_BASE_CLASS} border-warning bg-background/80 text-warning`
    : `${OVERLAY_BADGE_BASE_CLASS} border-warning/60 bg-background/80 text-warning`;

export const CATEGORY_UNIT_ROW_OVERLAY_CLASS =
  "absolute inset-x-2 bottom-2 z-10 flex items-center justify-between gap-xs";
