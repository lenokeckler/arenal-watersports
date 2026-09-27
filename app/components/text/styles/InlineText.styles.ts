import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const INLINE_TEXT_BASE_CLASS = "text-base";

export const INLINE_TEXT_BOLD_CLASS = "font-bold";

export const resolveInlineTextClassName = (
  isBold: boolean,
  className: string
): string =>
  joinClassNames(
    INLINE_TEXT_BASE_CLASS,
    isBold && INLINE_TEXT_BOLD_CLASS,
    className
  );
