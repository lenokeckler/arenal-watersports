import { STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import {
  CATEGORY_ALERT_ISSUE,
  type CategoryAlertIssue,
} from "../constants/CategoryAlertIssue.constants";
import {
  CATEGORY_ALERT_INTEGER_PATTERN,
  CATEGORY_ALERT_LIMITS,
} from "../constants/CategoryAlertLimits.constants";

export const findCategoryAlertIssue = (
  valueText: string
): NullableRef<CategoryAlertIssue> => {
  const trimmedText = valueText.trim();
  if (trimmedText === STRING.Empty) {
    return CATEGORY_ALERT_ISSUE.REQUIRED;
  }
  if (!CATEGORY_ALERT_INTEGER_PATTERN.test(trimmedText)) {
    return CATEGORY_ALERT_ISSUE.NOT_INTEGER;
  }
  const value = Number(trimmedText);
  if (value < CATEGORY_ALERT_LIMITS.MIN) {
    return CATEGORY_ALERT_ISSUE.NOT_POSITIVE;
  }
  return value > CATEGORY_ALERT_LIMITS.MAX
    ? CATEGORY_ALERT_ISSUE.TOO_LARGE
    : null;
};
