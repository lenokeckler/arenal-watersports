import { PATHS, STRING } from "@/app/constants";

export const resolveCategoryConfigurePath = (
  categoryId: string
): string =>
  [PATHS.ADMINISTRATION.CATEGORIES, categoryId].join(
    STRING.SLASH
  );
