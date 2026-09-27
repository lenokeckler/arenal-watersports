import { joinClassNames } from "@/app/utils/class-names/joinClassNames";

export const SECTION_TITLE_CLASS =
  "mt-6 text-center text-2xl lg:text-4xl font-bold text-on-surface mb-6 rounded-lg";

export const resolveSectionTitleClassName = (
  className: string
): string => joinClassNames(SECTION_TITLE_CLASS, className);
