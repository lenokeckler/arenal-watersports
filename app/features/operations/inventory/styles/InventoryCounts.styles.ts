import {
  INVENTORY_TRACKING_MODE,
  type InventoryTrackingMode,
} from "@/app/constants";

export const INVENTORY_COUNTS_GRID_CLASS: Record<
  InventoryTrackingMode,
  string
> = {
  [INVENTORY_TRACKING_MODE.BY_QUANTITY]:
    "grid grid-cols-2 gap-2 sm:grid-cols-4",
  [INVENTORY_TRACKING_MODE.BY_UNIT]:
    "grid grid-cols-2 gap-2 sm:grid-cols-5",
};

export const INVENTORY_COUNT_CLASS =
  "flex min-h-16 flex-col justify-center gap-1 rounded-lg border border-outline/60 bg-surface-container-low px-3 py-2";

export const INVENTORY_COUNT_VALUE_CLASS =
  "text-title-md text-on-surface";

export const INVENTORY_COUNT_LABEL_CLASS =
  "text-label-mono uppercase tracking-wide text-on-surface-variant";
