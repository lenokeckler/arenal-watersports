import type { CategoryAlertsRowUpdate } from "../models/CategoryAlertsRowUpdate.type";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";

export const mapUpdateCategoryAlertsInputToRow = (
  input: UpdateCategoryAlertsInput,
  adminWorkerId: string
): CategoryAlertsRowUpdate => ({
  alert_min_quantity: input.alertMinQuantity ?? null,
  alert_expiry_days: input.alertExpiryDays ?? null,
  updated_by: adminWorkerId,
});
