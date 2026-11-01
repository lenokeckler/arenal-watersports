import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const RESERVATION_HISTORY_PAGINATION_CLASS =
  "grid grid-cols-[1fr_auto_1fr] items-center gap-sm";

export const RESERVATION_HISTORY_PAGINATION_STATUS_CLASS =
  "text-body-base text-on-surface-variant";

const RESERVATION_HISTORY_PAGE_LINK_BASE_CLASS =
  "inline-flex min-h-12 items-center justify-center rounded-lg border px-md text-button font-semibold first:justify-self-start last:justify-self-end";

export const RESERVATION_HISTORY_PAGE_LINK_CLASS =
  joinClassNames(
    RESERVATION_HISTORY_PAGE_LINK_BASE_CLASS,
    "border-outline text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
  );

export const RESERVATION_HISTORY_DISABLED_PAGE_LINK_CLASS =
  joinClassNames(
    RESERVATION_HISTORY_PAGE_LINK_BASE_CLASS,
    "border-outline/50 text-on-surface-variant/60"
  );
