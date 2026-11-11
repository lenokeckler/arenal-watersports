import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryStockPath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.CATEGORIES,
    categoryId,
    PATHS.ADMINISTRATION.CATEGORY_STOCK_SEGMENT,
  ].join(STRING.SLASH);
