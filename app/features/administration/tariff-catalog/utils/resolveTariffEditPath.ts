import { PATHS, STRING } from "@/app/constants";

export const resolveTariffEditPath = (
  categoryId: string
): string =>
  [
    PATHS.ADMINISTRATION.TARIFFS,
    encodeURIComponent(categoryId),
  ].join(STRING.SLASH);
