import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const INVENTORY_PAGINATION_CLASS =
  "flex flex-wrap items-center justify-between gap-3 border-t border-outline/60 pt-4";

export const INVENTORY_PAGINATION_LINK_CLASS =
  "inline-flex min-h-11 items-center rounded-lg px-3 text-button text-primary hover:bg-surface-container-high focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const INVENTORY_PAGINATION_DISABLED_CLASS =
  "pointer-events-none opacity-50";

export const INVENTORY_PAGINATION_STATUS_CLASS =
  "text-sm text-on-surface-variant";

export const resolveInventoryPaginationLinkClassName = (
  isDisabled: boolean
): string =>
  joinClassNames(
    INVENTORY_PAGINATION_LINK_CLASS,
    isDisabled && INVENTORY_PAGINATION_DISABLED_CLASS
  );
