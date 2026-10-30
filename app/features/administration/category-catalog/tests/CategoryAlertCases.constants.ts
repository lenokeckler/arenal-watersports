import {
  CATEGORY_ALERT_ISSUE,
  type CategoryAlertIssue,
} from "../constants/CategoryAlertIssue.constants";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";

const STORED_QUANTITY = 5;
const STORED_DAYS = 30;

export const ALERT_TYPE_BY_STORED_VALUES = [
  {
    alertMinQuantity: null,
    alertExpiryDays: null,
    alertType: CATEGORY_ALERT_TYPE.NONE,
  },
  {
    alertMinQuantity: STORED_QUANTITY,
    alertExpiryDays: null,
    alertType: CATEGORY_ALERT_TYPE.QUANTITY,
  },
  {
    alertMinQuantity: null,
    alertExpiryDays: STORED_DAYS,
    alertType: CATEGORY_ALERT_TYPE.EXPIRY,
  },
  {
    alertMinQuantity: STORED_QUANTITY,
    alertExpiryDays: STORED_DAYS,
    alertType: CATEGORY_ALERT_TYPE.BOTH,
  },
];

export const ALERT_FIELDS: Array<
  keyof CategoryAlertFormErrors
> = ["minQuantityText", "expiryDaysText"];

export const ALERT_TEXT_CASES: Array<{
  description: string;
  text: string;
  expectedIssue: CategoryAlertIssue | null;
}> = [
  { description: "one", text: "1", expectedIssue: null },
  {
    description: "the int4 maximum",
    text: "2147483647",
    expectedIssue: null,
  },
  {
    description: "a value padded with whitespace",
    text: "  7  ",
    expectedIssue: null,
  },
  {
    description: "the int4 maximum plus one",
    text: "2147483648",
    expectedIssue: CATEGORY_ALERT_ISSUE.TOO_LARGE,
  },
  {
    description: "zero",
    text: "0",
    expectedIssue: CATEGORY_ALERT_ISSUE.NOT_POSITIVE,
  },
  {
    description: "a negative value",
    text: "-3",
    expectedIssue: CATEGORY_ALERT_ISSUE.NOT_POSITIVE,
  },
  {
    description: "a decimal",
    text: "1.5",
    expectedIssue: CATEGORY_ALERT_ISSUE.NOT_INTEGER,
  },
  {
    description: "text",
    text: "abc",
    expectedIssue: CATEGORY_ALERT_ISSUE.NOT_INTEGER,
  },
  {
    description: "an empty string",
    text: "",
    expectedIssue: CATEGORY_ALERT_ISSUE.REQUIRED,
  },
  {
    description: "only whitespace",
    text: "   ",
    expectedIssue: CATEGORY_ALERT_ISSUE.REQUIRED,
  },
];
