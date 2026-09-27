import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const TEXT_BASE_CLASS = "text-base text-on-surface";

export const TEXT_BOLD_CLASS = "font-bold";

export const resolveTextClassName = (
  isBold: boolean,
  className: string
): string =>
  joinClassNames(
    TEXT_BASE_CLASS,
    isBold && TEXT_BOLD_CLASS,
    className
  );
