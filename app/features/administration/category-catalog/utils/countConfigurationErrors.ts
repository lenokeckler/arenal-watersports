import type { CategoryConfigurationErrors } from "../models/CategoryConfigurationErrors.interface";

export const countConfigurationErrors = (
  errors: CategoryConfigurationErrors
): number =>
  Object.values(errors).reduce(
    (total, sectionErrors) =>
      total + Object.keys(sectionErrors).length,
    0
  );
