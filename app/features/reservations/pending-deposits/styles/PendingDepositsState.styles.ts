import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { DEPOSIT_ITEM_CONTAINER_CLASS } from "./PendingDepositItem.styles";

export const DEPOSIT_LIST_EMPTY_CLASS =
  "flex flex-col items-center gap-sm rounded-xl border border-dashed border-outline-variant p-lg text-center";

export const DEPOSIT_LIST_EMPTY_ICON_CLASS =
  "text-4xl text-on-surface-variant";

export const DEPOSIT_LIST_STATE_TITLE_CLASS =
  "text-title-md text-on-surface";

export const DEPOSIT_LIST_STATE_BODY_CLASS =
  "text-body-base text-on-surface-variant";

export const DEPOSIT_LIST_ERROR_CLASS =
  "flex items-start gap-sm rounded-xl bg-error-container p-md text-on-error-container";

export const DEPOSIT_LIST_ERROR_ICON_CLASS =
  "shrink-0 text-2xl";

export const DEPOSIT_LIST_ERROR_TEXT_CLASS =
  "flex flex-col gap-xs";

export const DEPOSIT_LIST_ERROR_TITLE_CLASS =
  "text-title-md text-on-error-container";

export const DEPOSIT_LIST_ERROR_BODY_CLASS =
  "text-body-base text-on-error-container";

export const DEPOSIT_SKELETON_ITEM_CLASS = joinClassNames(
  DEPOSIT_ITEM_CONTAINER_CLASS,
  "animate-pulse motion-reduce:animate-none"
);

export const DEPOSIT_SKELETON_DETAILS_CLASS =
  "flex w-full flex-col gap-xs";

export const DEPOSIT_SKELETON_BAR_CLASS =
  "h-4 rounded bg-surface-container-high";

export const DEPOSIT_SKELETON_CUSTOMER_CLASS =
  joinClassNames(DEPOSIT_SKELETON_BAR_CLASS, "w-3/5");

export const DEPOSIT_SKELETON_CODE_CLASS = joinClassNames(
  DEPOSIT_SKELETON_BAR_CLASS,
  "w-1/3"
);

export const DEPOSIT_SKELETON_AMOUNT_CLASS = joinClassNames(
  DEPOSIT_SKELETON_BAR_CLASS,
  "w-1/4 shrink-0"
);

export const DEPOSIT_SCREEN_READER_CLASS = "sr-only";
