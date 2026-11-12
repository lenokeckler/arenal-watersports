import { PATHS, STRING } from "@/app/constants";

export const resolveBoardCategoryPath = (
  categoryId: string
): string =>
  [PATHS.BOARD_CATEGORIES, categoryId].join(STRING.SLASH);
