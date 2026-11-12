import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import type { CategoryAlertFormFieldCase } from "../models/CategoryAlertFormFieldCase.interface";
import type { UpdateCategoryAlertsInput } from "../models/UpdateCategoryAlertsInput.interface";
import {
  EDITED_EXPIRY_DAYS,
  EDITED_EXPIRY_DAYS_TEXT,
  EDITED_MIN_QUANTITY,
  EDITED_MIN_QUANTITY_TEXT,
} from "./useCategoryAlertForm.constants";

export const INPUT_MODE_ATTRIBUTE = "inputmode";

export const ALERT_TYPE_OPTION_LABELS = [
  CATEGORY_CATALOG_COPY.ALERT_TYPE_NONE_LABEL,
  CATEGORY_CATALOG_COPY.ALERT_TYPE_QUANTITY_LABEL,
  CATEGORY_CATALOG_COPY.ALERT_TYPE_EXPIRY_LABEL,
  CATEGORY_CATALOG_COPY.ALERT_TYPE_BOTH_LABEL,
];

export const ALERT_FIELD_VISIBILITY_CASES: CategoryAlertFormFieldCase[] =
  [
    {
      alertType: CATEGORY_ALERT_TYPE.NONE,
      showsQuantity: false,
      showsExpiry: false,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      showsQuantity: true,
      showsExpiry: false,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.EXPIRY,
      showsQuantity: false,
      showsExpiry: true,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.BOTH,
      showsQuantity: true,
      showsExpiry: true,
    },
  ];

export const ALERT_SUBMIT_CASES: Array<{
  alertType: CategoryAlertFormFieldCase["alertType"];
  minQuantityText?: string;
  expiryDaysText?: string;
  expected: Partial<UpdateCategoryAlertsInput>;
}> = [
  {
    alertType: CATEGORY_ALERT_TYPE.QUANTITY,
    minQuantityText: EDITED_MIN_QUANTITY_TEXT,
    expected: {
      alertMinQuantity: EDITED_MIN_QUANTITY,
      alertExpiryDays: null,
    },
  },
  {
    alertType: CATEGORY_ALERT_TYPE.EXPIRY,
    expiryDaysText: EDITED_EXPIRY_DAYS_TEXT,
    expected: {
      alertMinQuantity: null,
      alertExpiryDays: EDITED_EXPIRY_DAYS,
    },
  },
  {
    alertType: CATEGORY_ALERT_TYPE.BOTH,
    minQuantityText: EDITED_MIN_QUANTITY_TEXT,
    expiryDaysText: EDITED_EXPIRY_DAYS_TEXT,
    expected: {
      alertMinQuantity: EDITED_MIN_QUANTITY,
      alertExpiryDays: EDITED_EXPIRY_DAYS,
    },
  },
  {
    alertType: CATEGORY_ALERT_TYPE.NONE,
    expected: {
      alertMinQuantity: null,
      alertExpiryDays: null,
    },
  },
];

export const ALERT_ERROR_FIELD_CASES: Array<{
  field: keyof CategoryAlertFormErrors;
  otherField: keyof CategoryAlertFormErrors;
}> = [
  {
    field: "minQuantityText",
    otherField: "expiryDaysText",
  },
  {
    field: "expiryDaysText",
    otherField: "minQuantityText",
  },
];
