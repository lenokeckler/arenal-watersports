import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryBehaviorFormErrors } from "../models/CategoryBehaviorFormErrors.interface";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";

const isPositiveIntegerString = (
  value: string
): boolean => {
  const parsedValue = Number(value.trim());
  return Number.isInteger(parsedValue) && parsedValue > 0;
};

export const validateCategoryBehaviorFormValues = (
  values: CategoryBehaviorFormValues
): CategoryBehaviorFormErrors => {
  const errors: CategoryBehaviorFormErrors = {};

  if (
    values.isReservable &&
    !isPositiveIntegerString(values.defaultDurationMinutes)
  ) {
    errors.defaultDurationMinutes =
      CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR;
  }

  return errors;
};
