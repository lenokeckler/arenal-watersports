import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const TEXT_BOLD_CLASS = "font-bold";

export const resolveTextClassName = (
  isBold: boolean,
  className: string
): string =>
  joinClassNames(isBold && TEXT_BOLD_CLASS, className);
