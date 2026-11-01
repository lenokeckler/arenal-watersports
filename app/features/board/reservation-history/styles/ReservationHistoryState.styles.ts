import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const RESERVATION_HISTORY_SCREEN_READER_CLASS =
  "sr-only";

export const RESERVATION_HISTORY_ERROR_CLASS =
  "flex flex-col gap-md rounded-xl bg-error-container p-md text-on-error-container";

export const RESERVATION_HISTORY_ERROR_ICON_CLASS =
  "shrink-0 text-2xl";

export const RESERVATION_HISTORY_ERROR_MESSAGE_CLASS =
  "flex items-start gap-sm";

export const RESERVATION_HISTORY_ERROR_TEXT_CLASS =
  "flex flex-col gap-xs";

export const RESERVATION_HISTORY_ERROR_TITLE_CLASS =
  "text-title-md text-on-error-container";

export const RESERVATION_HISTORY_ERROR_BODY_CLASS =
  "text-body-base text-on-error-container";

export const RESERVATION_HISTORY_RETRY_CLASS =
  "min-h-12 w-full md:w-auto";

export const RESERVATION_HISTORY_SKELETON_ITEM_CLASS =
  "flex min-h-12 animate-pulse flex-col gap-xs rounded-xl border border-l-4 border-outline-variant bg-card-tint-neutral-bg p-md motion-reduce:animate-none";

const RESERVATION_HISTORY_SKELETON_BAR_CLASS =
  "h-4 rounded bg-surface-container-high";

export const RESERVATION_HISTORY_SKELETON_DATE_CLASS =
  joinClassNames(
    RESERVATION_HISTORY_SKELETON_BAR_CLASS,
    "w-1/4"
  );

export const RESERVATION_HISTORY_SKELETON_CUSTOMER_CLASS =
  joinClassNames(
    RESERVATION_HISTORY_SKELETON_BAR_CLASS,
    "w-3/5"
  );

export const RESERVATION_HISTORY_SKELETON_LINE_CLASS =
  joinClassNames(
    RESERVATION_HISTORY_SKELETON_BAR_CLASS,
    "w-2/5"
  );
