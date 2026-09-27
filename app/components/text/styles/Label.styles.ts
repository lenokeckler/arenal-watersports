import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const LABEL_BASE_CLASS = "text-sm";

export const LABEL_BOLD_CLASS = "font-bold";

export const LABEL_REGULAR_CLASS = "font-medium";

export const LABEL_COLOR_CLASS = "text-on-surface-variant";

export const resolveLabelClassName = (
  isBold: boolean,
  className: string
): string =>
  joinClassNames(
    LABEL_BASE_CLASS,
    isBold ? LABEL_BOLD_CLASS : LABEL_REGULAR_CLASS,
    LABEL_COLOR_CLASS,
    className
  );
