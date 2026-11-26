import { PATHS, STRING } from "@/app/constants";

export const resolveComboEditPath = (
  comboId: string
): string =>
  [
    PATHS.ADMINISTRATION.COMBOS,
    encodeURIComponent(comboId),
  ].join(STRING.SLASH);
