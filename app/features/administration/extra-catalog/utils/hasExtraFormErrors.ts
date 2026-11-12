import type { ExtraFormErrors } from "../models/ExtraFormErrors.interface";

export const hasExtraFormErrors = (
  errors: ExtraFormErrors
): boolean => Object.keys(errors).length > 0;
