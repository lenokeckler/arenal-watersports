import type { CategoryAlertType } from "../constants/CategoryAlertType.constants";

export const isCategoryAlertTypeChoiceSelected = (
  choiceType: CategoryAlertType,
  alertType: CategoryAlertType
): boolean => choiceType === alertType;
