import {
  INVENTORY_UNIT_STATUS,
  type ActiveInventoryUnitStatus,
} from "@/app/constants";

export const CATEGORY_UNIT_ROW_CLASS =
  "flex w-full min-w-0 flex-col gap-sm rounded-xl border border-outline-variant bg-card-tint-neutral-bg p-sm backdrop-blur-md md:p-md";

export const CATEGORY_UNIT_ROW_HEADER_CLASS =
  "flex flex-wrap items-center justify-between gap-sm";

export const CATEGORY_UNIT_ROW_CODE_CLASS =
  "break-words text-title-md text-on-surface";

export const CATEGORY_UNIT_DETAIL_CLASS =
  "flex flex-col gap-xs border-t border-outline-variant pt-sm";

export const CATEGORY_UNIT_RETURN_CLASS =
  "text-body-base font-semibold text-tertiary";

export const CATEGORY_UNIT_CUSTOMER_CLASS =
  "break-words text-body-base text-on-surface";

export const CATEGORY_UNIT_REFERENCE_CLASS =
  "break-words text-body-base tabular-nums text-on-surface-variant";

const CHIP_BASE_CLASS =
  "inline-flex items-center gap-xs rounded-full border bg-surface-container-highest/80 px-3 py-1 text-label-mono uppercase";

const DOT_BASE_CLASS = "block size-2 rounded-full";

const CHIP_AVAILABLE_CLASS = `${CHIP_BASE_CLASS} border-primary/30 text-primary`;
const CHIP_OCCUPIED_CLASS = `${CHIP_BASE_CLASS} border-tertiary/30 text-tertiary`;
const CHIP_MAINTENANCE_CLASS = `${CHIP_BASE_CLASS} border-outline/30 text-outline`;
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
