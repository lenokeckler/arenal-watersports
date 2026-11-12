import { joinClassNames } from "@/app/utils/class-names/joinClassNames";
import { CATEGORY_UNIT_ROW_CLASS } from "./CategoryUnitRow.styles";

export const CATEGORY_UNITS_EMPTY_CLASS =
  "flex flex-col items-center gap-sm rounded-xl border border-dashed border-outline-variant p-lg text-center";

export const CATEGORY_UNITS_EMPTY_ICON_CLASS =
  "text-4xl text-on-surface-variant";

export const CATEGORY_UNITS_STATE_TITLE_CLASS =
  "text-title-md text-on-surface";

export const CATEGORY_UNITS_STATE_BODY_CLASS =
  "text-body-base text-on-surface-variant";

export const CATEGORY_UNITS_ERROR_CLASS =
  "flex items-start gap-sm rounded-xl bg-error-container p-md text-on-error-container";

export const CATEGORY_UNITS_ERROR_ICON_CLASS =
  "shrink-0 text-2xl";

export const CATEGORY_UNITS_ERROR_TEXT_CLASS =
  "flex flex-col gap-xs";

export const CATEGORY_UNITS_ERROR_TITLE_CLASS =
  "text-title-md text-on-error-container";

export const CATEGORY_UNITS_ERROR_BODY_CLASS =
  "text-body-base text-on-error-container";

export const CATEGORY_UNITS_ERROR_BUTTON_CLASS =
  "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const CATEGORY_UNITS_SKELETON_ROW_CLASS =
  joinClassNames(
    CATEGORY_UNIT_ROW_CLASS,
    "animate-pulse motion-reduce:animate-none"
  );

const CATEGORY_UNITS_SKELETON_BAR_CLASS =
  "rounded bg-surface-container-high";

export const CATEGORY_UNITS_SKELETON_TITLE_CLASS =
  joinClassNames(
    CATEGORY_UNITS_SKELETON_BAR_CLASS,
    "h-8 w-2/3 animate-pulse motion-reduce:animate-none"
  );

export const CATEGORY_UNITS_SKELETON_CODE_CLASS =
  joinClassNames(
    CATEGORY_UNITS_SKELETON_BAR_CLASS,
    "h-5 w-1/3"
  );

export const CATEGORY_UNITS_SKELETON_CHIP_CLASS =
  joinClassNames(
    CATEGORY_UNITS_SKELETON_BAR_CLASS,
    "h-6 w-24 rounded-full"
  );

export const CATEGORY_UNITS_SKELETON_HEADER_CLASS =
  "flex items-center justify-between gap-sm";

export const CATEGORY_UNITS_SKELETON_DETAIL_CLASS =
  "flex flex-col gap-1 border-t border-outline-variant pt-sm";

export const CATEGORY_UNITS_SKELETON_RETURN_CLASS =
  joinClassNames(
    CATEGORY_UNITS_SKELETON_BAR_CLASS,
    "h-6 w-1/2"
  );

export const CATEGORY_UNITS_SKELETON_LINE_CLASS =
  joinClassNames(
    CATEGORY_UNITS_SKELETON_BAR_CLASS,
    "h-5 w-3/4"
  );
