import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import type { CategoryConfiguration } from "../models/CategoryConfiguration.interface";
import { doesCategoryAlertTypeIncludeExpiry } from "./doesCategoryAlertTypeIncludeExpiry";
import { doesCategoryAlertTypeIncludeQuantity } from "./doesCategoryAlertTypeIncludeQuantity";
import { parseCategoryAlertNumber } from "./parseCategoryAlertNumber";

export const applyCategoryAlertValues = (
  configuration: CategoryConfiguration,
  values: CategoryAlertFormValues
): CategoryConfiguration => ({
  ...configuration,
  alerts: {
    ...configuration.alerts,
    alertMinQuantity: doesCategoryAlertTypeIncludeQuantity(
      values.alertType
    )
      ? parseCategoryAlertNumber(values.minQuantityText)
      : null,
    alertExpiryDays: doesCategoryAlertTypeIncludeExpiry(
      values.alertType
    )
      ? parseCategoryAlertNumber(values.expiryDaysText)
      : null,
  },
});
