import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryBehaviorFormErrors } from "../models/CategoryBehaviorFormErrors.interface";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import { parseDefaultDurationMinutes } from "./parseDefaultDurationMinutes";
import { parseLowFuelLines } from "./parseLowFuelLines";

export const validateCategoryBehaviorFormValues = (
  values: CategoryBehaviorFormValues
): CategoryBehaviorFormErrors => {
  const errors: CategoryBehaviorFormErrors = {};

  if (
    values.isReservable &&
    parseDefaultDurationMinutes(
      values.defaultDurationMinutes
    ) === null
  ) {
    errors.defaultDurationMinutes =
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR;
  }

  if (
    values.consumesFuel &&
    parseLowFuelLines(values.lowFuelLines) === null
  ) {
    errors.lowFuelLines =
      CATEGORY_CATALOG_COPY.LOW_FUEL_LINES_INVALID_ERROR;
  }

  return errors;
};
