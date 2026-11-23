import {
  CATEGORY_ALERT_TYPE,
  type CategoryAlertType,
} from "../constants/CategoryAlertType.constants";

export const isCategoryAlertTypeChoiceSelected = (
  choiceType: CategoryAlertType,
  alertType: CategoryAlertType
): boolean =>
  choiceType === alertType ||
  (alertType === CATEGORY_ALERT_TYPE.BOTH &&
    choiceType !== CATEGORY_ALERT_TYPE.NONE);
