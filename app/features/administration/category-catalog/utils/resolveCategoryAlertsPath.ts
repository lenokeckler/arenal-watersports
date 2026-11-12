import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryAlertsPath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.CATEGORIES,
    categoryId,
    PATHS.ADMINISTRATION.CATEGORY_ALERTS_SEGMENT,
  ].join(STRING.SLASH);
