import { PATHS, STRING } from "@/app/constants";
import { resolveExtraEditPath } from "./resolveExtraEditPath";

export const resolveExtraCompatibilityPath = (
  extraId: string
): string =>
  [
    resolveExtraEditPath(extraId),
    PATHS.ADMINISTRATION.EXTRA_COMPATIBILITY_SEGMENT,
  ].join(STRING.SLASH);
