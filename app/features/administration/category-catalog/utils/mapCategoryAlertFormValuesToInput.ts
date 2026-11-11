import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import { doesCategoryAlertTypeIncludeExpiry } from "./doesCategoryAlertTypeIncludeExpiry";
import { doesCategoryAlertTypeIncludeQuantity } from "./doesCategoryAlertTypeIncludeQuantity";

export const mapCategoryAlertFormValuesToInput = (
  categoryId: string,
  values: CategoryAlertFormValues
): UpdateCategoryAlertsInput => ({
  categoryId,
  alertMinQuantity: doesCategoryAlertTypeIncludeQuantity(
    values.alertType
  )
    ? Number(values.minQuantityText.trim())
    : null,
  alertExpiryDays: doesCategoryAlertTypeIncludeExpiry(
    values.alertType
  )
    ? Number(values.expiryDaysText.trim())
    : null,
});
