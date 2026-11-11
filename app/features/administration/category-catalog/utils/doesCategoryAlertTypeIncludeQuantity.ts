import {
  CATEGORY_ALERT_TYPE,
  type CategoryAlertType,
} from "../constants/CategoryAlertType.constants";

export const doesCategoryAlertTypeIncludeQuantity = (
  alertType: CategoryAlertType
): boolean =>
  alertType === CATEGORY_ALERT_TYPE.QUANTITY ||
  alertType === CATEGORY_ALERT_TYPE.BOTH;
