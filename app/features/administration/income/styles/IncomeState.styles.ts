import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { INCOME_CURRENCY_CLASS } from "./IncomeCurrency.styles";

export const INCOME_EMPTY_CLASS =
  "flex flex-col items-center gap-sm rounded-xl border border-dashed border-outline-variant p-lg text-center";

export const INCOME_EMPTY_ICON_CLASS =
  "text-4xl text-on-surface-variant";

export const INCOME_STATE_TITLE_CLASS =
  "text-title-md text-on-surface";

export const INCOME_STATE_BODY_CLASS =
  "text-body-base text-on-surface-variant";

export const INCOME_NO_MOVEMENT_CLASS =
  "flex items-center gap-sm rounded-xl border border-dashed border-outline-variant p-md";

export const INCOME_NO_MOVEMENT_ICON_CLASS =
  "shrink-0 text-2xl text-on-surface-variant";

export const INCOME_ERROR_CLASS =
  "flex items-start gap-sm rounded-xl bg-error-container p-md text-on-error-container";

export const INCOME_ERROR_ICON_CLASS = "shrink-0 text-2xl";

export const INCOME_ERROR_TEXT_CLASS =
  "flex flex-col gap-xs";

export const INCOME_ERROR_TITLE_CLASS =
  "text-title-md text-on-error-container";

export const INCOME_ERROR_BODY_CLASS =
  "text-body-base text-on-error-container";

export const INCOME_SKELETON_CARD_CLASS = joinClassNames(
  INCOME_CURRENCY_CLASS,
  "animate-pulse motion-reduce:animate-none"
);

export const INCOME_SKELETON_BAR_CLASS =
  "rounded bg-surface-container-high";

export const INCOME_SKELETON_NAME_CLASS = joinClassNames(
  INCOME_SKELETON_BAR_CLASS,
  "h-5 w-1/3"
);

export const INCOME_SKELETON_ROW_CLASS =
  "flex justify-between gap-sm";

export const INCOME_SKELETON_LABEL_CLASS = joinClassNames(
  INCOME_SKELETON_BAR_CLASS,
  "h-4 w-1/4"
);

export const INCOME_SKELETON_FIGURE_CLASS = joinClassNames(
  INCOME_SKELETON_BAR_CLASS,
  "h-5 w-1/3"
);

export const INCOME_SKELETON_NET_LABEL_CLASS =
  joinClassNames(INCOME_SKELETON_BAR_CLASS, "h-3 w-1/5");

export const INCOME_SKELETON_NET_AMOUNT_CLASS =
  joinClassNames(INCOME_SKELETON_BAR_CLASS, "h-8 w-1/2");
