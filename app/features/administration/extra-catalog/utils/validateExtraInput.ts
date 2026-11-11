import type { ExtraFormErrors } from "../models/ExtraFormErrors.interface";
import { readExtraName } from "./readExtraName";
import { validateExtraName } from "./validateExtraName";
import { validateExtraPrices } from "./validateExtraPrices";

export const validateExtraInput = (
  input: unknown
): ExtraFormErrors => {
  const nameError = validateExtraName(readExtraName(input));

  return {
    ...(nameError ? { name: nameError } : {}),
    ...validateExtraPrices(input),
  };
};
