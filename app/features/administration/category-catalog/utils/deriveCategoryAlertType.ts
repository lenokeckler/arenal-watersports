import type { NullableRef } from "@/app/types";
import {
  CATEGORY_ALERT_TYPE,
  type CategoryAlertType,
} from "../constants/CategoryAlertType.constants";

export const deriveCategoryAlertType = (
  alertMinQuantity: NullableRef<number>,
  alertExpiryDays: NullableRef<number>
): CategoryAlertType => {
  const hasQuantity = alertMinQuantity !== null;
  const hasExpiry = alertExpiryDays !== null;
  if (hasQuantity && hasExpiry) {
    return CATEGORY_ALERT_TYPE.BOTH;
  }
  if (hasQuantity) {
    return CATEGORY_ALERT_TYPE.QUANTITY;
  }
  return hasExpiry
    ? CATEGORY_ALERT_TYPE.EXPIRY
    : CATEGORY_ALERT_TYPE.NONE;
};
