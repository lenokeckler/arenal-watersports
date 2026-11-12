import { CATEGORY_ALERT_FORM_FIELD_ID } from "@/app/features/administration/category-catalog/constants/CategoryAlertFormFieldId.constants";
import { CATEGORY_ALERT_ISSUE } from "@/app/features/administration/category-catalog/constants/CategoryAlertIssue.constants";
import { CATEGORY_ALERT_TYPE } from "@/app/features/administration/category-catalog/constants/CategoryAlertType.constants";
import type { CategoryAlertInputCase } from "../models/CategoryAlertInputCase.interface";
import type { CategoryAlertSaveCase } from "../models/CategoryAlertSaveCase.interface";
import {
  E2E_ALERT_BOTH,
  E2E_ALERT_EXPIRY,
  E2E_ALERT_INPUT,
  E2E_ALERT_NONE,
  E2E_ALERT_NO_INPUT,
  E2E_ALERT_QUANTITY,
} from "./E2eCategoryAlerts.constants";

export const E2E_ALERT_SAVE_CASES: CategoryAlertSaveCase[] =
  [
    {
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      expected: E2E_ALERT_QUANTITY,
      input: {
        ...E2E_ALERT_NO_INPUT,
        minQuantityText: E2E_ALERT_INPUT.MIN_QUANTITY,
      },
      scenario: "quantity",
      seeded: E2E_ALERT_NONE,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.EXPIRY,
      expected: E2E_ALERT_EXPIRY,
      input: {
        ...E2E_ALERT_NO_INPUT,
        expiryDaysText: E2E_ALERT_INPUT.EXPIRY_DAYS,
      },
      scenario: "expiry",
      seeded: E2E_ALERT_NONE,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.BOTH,
      expected: E2E_ALERT_BOTH,
      input: {
        expiryDaysText: E2E_ALERT_INPUT.EXPIRY_DAYS,
        minQuantityText: E2E_ALERT_INPUT.MIN_QUANTITY,
      },
      scenario: "both",
      seeded: E2E_ALERT_NONE,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.NONE,
      expected: E2E_ALERT_NONE,
      input: E2E_ALERT_NO_INPUT,
      scenario: "both-to-none",
      seeded: E2E_ALERT_BOTH,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      expected: E2E_ALERT_QUANTITY,
      input: E2E_ALERT_NO_INPUT,
      scenario: "both-to-quantity",
      seeded: E2E_ALERT_BOTH,
    },
  ];

export const E2E_ALERT_INVALID_INPUT_CASES: CategoryAlertInputCase[] =
  [
    {
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      errorKey: "minQuantityText",
      fieldId: CATEGORY_ALERT_FORM_FIELD_ID.MIN_QUANTITY,
      input: {
        ...E2E_ALERT_NO_INPUT,
        minQuantityText: "0",
      },
      issue: CATEGORY_ALERT_ISSUE.NOT_POSITIVE,
      scenario: "zero-quantity",
    },
    {
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      errorKey: "minQuantityText",
      fieldId: CATEGORY_ALERT_FORM_FIELD_ID.MIN_QUANTITY,
      input: {
        ...E2E_ALERT_NO_INPUT,
        minQuantityText: "abc",
      },
      issue: CATEGORY_ALERT_ISSUE.NOT_INTEGER,
      scenario: "letters-quantity",
    },
    {
      alertType: CATEGORY_ALERT_TYPE.EXPIRY,
      errorKey: "expiryDaysText",
      fieldId: CATEGORY_ALERT_FORM_FIELD_ID.EXPIRY_DAYS,
      input: {
        ...E2E_ALERT_NO_INPUT,
        expiryDaysText: "1.5",
      },
      issue: CATEGORY_ALERT_ISSUE.NOT_INTEGER,
      scenario: "decimal-expiry",
    },
    {
      alertType: CATEGORY_ALERT_TYPE.EXPIRY,
      errorKey: "expiryDaysText",
      fieldId: CATEGORY_ALERT_FORM_FIELD_ID.EXPIRY_DAYS,
      input: E2E_ALERT_NO_INPUT,
      issue: CATEGORY_ALERT_ISSUE.REQUIRED,
      scenario: "blank-expiry",
    },
  ];
