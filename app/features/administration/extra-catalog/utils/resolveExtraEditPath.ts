import { PATHS, STRING } from "@/app/constants";

export const resolveExtraEditPath = (
  extraId: string
): string =>
  [
    PATHS.ADMINISTRATION.EXTRAS,
    encodeURIComponent(extraId),
  ].join(STRING.SLASH);
