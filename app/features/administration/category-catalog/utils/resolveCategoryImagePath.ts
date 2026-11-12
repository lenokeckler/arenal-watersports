import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryImagePath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.CATEGORIES,
    categoryId,
    PATHS.ADMINISTRATION.CATEGORY_IMAGE_SEGMENT,
  ].join(STRING.SLASH);
