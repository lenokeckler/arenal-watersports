import { STRING } from "@/app/constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryCreateFormErrors } from "../models/CategoryCreateFormErrors.interface";
import type { CategoryCreateFormValues } from "../models/CategoryCreateFormValues.interface";

export const validateCategoryCreateFormValues = (
  values: CategoryCreateFormValues
): CategoryCreateFormErrors => {
  const errors: CategoryCreateFormErrors = {};

  if (values.name.trim() === STRING.Empty) {
    errors.name =
      CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR;
  }

  if (values.trackingMode.trim() === STRING.Empty) {
    errors.trackingMode =
      CATEGORY_CATALOG_COPY.TRACKING_MODE_REQUIRED_ERROR;
  }

  return errors;
};
