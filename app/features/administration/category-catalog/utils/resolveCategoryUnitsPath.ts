import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryUnitsPath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.CATEGORIES,
    categoryId,
    PATHS.ADMINISTRATION.CATEGORY_UNITS_SEGMENT,
  ].join(STRING.SLASH);
