import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const CATEGORY_DURATION_CHIPS_GROUP_CLASS =
  "flex flex-wrap gap-2";

export const CATEGORY_DURATION_CHIP_BASE_CLASS =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export const CATEGORY_DURATION_CHIP_SELECTED_CLASS =
  "border-primary bg-primary-container text-on-primary-fixed";

export const CATEGORY_DURATION_CHIP_UNSELECTED_CLASS =
  "border-outline-variant bg-surface-container-highest text-on-surface";

export const resolveCategoryDurationChipClassName = (
  isSelected: boolean
): string =>
  joinClassNames(
    CATEGORY_DURATION_CHIP_BASE_CLASS,
    isSelected
      ? CATEGORY_DURATION_CHIP_SELECTED_CLASS
      : CATEGORY_DURATION_CHIP_UNSELECTED_CLASS
  );
