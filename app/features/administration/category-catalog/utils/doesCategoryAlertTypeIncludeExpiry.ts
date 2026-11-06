import {
  CATEGORY_ALERT_TYPE,
  type CategoryAlertType,
} from "../constants/CategoryAlertType.constants";

export const doesCategoryAlertTypeIncludeExpiry = (
  alertType: CategoryAlertType
): boolean =>
  alertType === CATEGORY_ALERT_TYPE.EXPIRY ||
  alertType === CATEGORY_ALERT_TYPE.BOTH;
