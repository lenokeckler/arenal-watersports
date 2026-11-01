import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryUnitsPath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.CATEGORIES,
    categoryId,
    PATHS.ADMINISTRATION.CATEGORY_UNITS_SEGMENT,
  ].join(STRING.SLASH);

export const resolveUnitNewPath = (
  categoryId: string
): string =>
  [
    resolveCategoryUnitsPath(categoryId),
    PATHS.ADMINISTRATION.UNITS_NEW_SEGMENT,
  ].join(STRING.SLASH);

export const resolveUnitEditPath = (
  categoryId: string,
  unitId: string
): string =>
  [resolveCategoryUnitsPath(categoryId), unitId].join(
    STRING.SLASH
  );
