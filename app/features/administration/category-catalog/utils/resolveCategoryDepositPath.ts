import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryDepositPath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.CATEGORIES,
    categoryId,
    PATHS.ADMINISTRATION.CATEGORY_DEPOSIT_SEGMENT,
  ].join(STRING.SLASH);
