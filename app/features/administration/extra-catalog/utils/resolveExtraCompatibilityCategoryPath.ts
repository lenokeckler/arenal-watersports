import { STRING } from "@/app/constants";
import { resolveExtraCompatibilityPath } from "./resolveExtraCompatibilityPath";

export const resolveExtraCompatibilityCategoryPath = (
  extraId: string,
  categoryId: string
): string =>
  [
    resolveExtraCompatibilityPath(extraId),
    encodeURIComponent(categoryId),
  ].join(STRING.SLASH);
