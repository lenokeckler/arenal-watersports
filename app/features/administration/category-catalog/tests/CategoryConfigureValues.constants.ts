import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

export const NEGATIVE_ALERT_NUMBER = -3;
export const NEGATIVE_ALERT_TEXT =
  NEGATIVE_ALERT_NUMBER.toString();
export const INFINITE_ALERT_TEXT =
  Number.POSITIVE_INFINITY.toString();

export const EDITED_CATEGORY_BEHAVIOR_FORM_VALUES: CategoryBehaviorFormValues =
  {
    ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
    hasMotor: false,
    consumesFuel: false,
    canBeDamaged: false,
    hasConditionPhotos: true,
    guideOnly: true,
  };
