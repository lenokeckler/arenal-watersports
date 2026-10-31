import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryBehaviorPath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.CATEGORIES,
    categoryId,
    PATHS.ADMINISTRATION.CATEGORY_BEHAVIOR_SEGMENT,
  ].join(STRING.SLASH);
