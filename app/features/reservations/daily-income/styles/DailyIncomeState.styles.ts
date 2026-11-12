import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { CURRENCY_INCOME_SECTION_CLASS } from "./DailyIncomeCurrency.styles";

export const DAILY_INCOME_EMPTY_CLASS =
  "flex flex-col items-center gap-sm rounded-xl border border-dashed border-outline-variant p-lg text-center";

export const DAILY_INCOME_EMPTY_ICON_CLASS =
  "text-4xl text-on-surface-variant";

export const DAILY_INCOME_STATE_TITLE_CLASS =
  "text-title-md text-on-surface";

export const DAILY_INCOME_STATE_BODY_CLASS =
  "text-body-base text-on-surface-variant";

export const CURRENCY_NO_MOVEMENT_CLASS =
  "flex items-center gap-sm rounded-xl border border-dashed border-outline-variant p-md";

export const CURRENCY_NO_MOVEMENT_ICON_CLASS =
  "shrink-0 text-2xl text-on-surface-variant";

export const DAILY_INCOME_ERROR_CLASS =
  "flex items-start gap-sm rounded-xl bg-error-container p-md text-on-error-container";

export const DAILY_INCOME_ERROR_ICON_CLASS =
  "shrink-0 text-2xl";

export const DAILY_INCOME_ERROR_TEXT_CLASS =
  "flex flex-col gap-xs";

export const DAILY_INCOME_ERROR_TITLE_CLASS =
  "text-title-md text-on-error-container";

export const DAILY_INCOME_ERROR_BODY_CLASS =
  "text-body-base text-on-error-container";

export const DAILY_INCOME_SKELETON_CARD_CLASS =
  joinClassNames(
    CURRENCY_INCOME_SECTION_CLASS,
    "animate-pulse motion-reduce:animate-none"
  );

export const DAILY_INCOME_SKELETON_BAR_CLASS =
  "rounded bg-surface-container-high";

export const DAILY_INCOME_SKELETON_NAME_CLASS =
  joinClassNames(
    DAILY_INCOME_SKELETON_BAR_CLASS,
    "h-4 w-1/3"
  );

export const DAILY_INCOME_SKELETON_AMOUNT_CLASS =
  joinClassNames(
    DAILY_INCOME_SKELETON_BAR_CLASS,
    "h-8 w-5/12"
  );

export const DAILY_INCOME_SKELETON_METHOD_CLASS =
  joinClassNames(
    DAILY_INCOME_SKELETON_BAR_CLASS,
    "h-4 w-1/2"
  );

export const DAILY_INCOME_SKELETON_TRACK_CLASS =
  joinClassNames(
    DAILY_INCOME_SKELETON_BAR_CLASS,
    "h-3 w-full rounded-full"
  );

export const DAILY_INCOME_SCREEN_READER_CLASS = "sr-only";
