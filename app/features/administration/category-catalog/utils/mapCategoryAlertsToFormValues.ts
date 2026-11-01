import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { CategoryAlertFormValues } from "../models/CategoryAlertFormValues.interface";
import type { CategoryAlerts } from "../models/CategoryAlerts.interface";
import { deriveCategoryAlertType } from "./deriveCategoryAlertType";

export const mapCategoryAlertsToFormValues = (
  alerts: CategoryAlerts
): CategoryAlertFormValues => ({
  alertType: deriveCategoryAlertType(
    alerts.alertMinQuantity,
    alerts.alertExpiryDays
  ),
  minQuantityText: safeString(
    alerts.alertMinQuantity?.toString()
  ),
  expiryDaysText: safeString(
    alerts.alertExpiryDays?.toString()
  ),
});
