import { CATEGORY_ALERT_ISSUE } from "../constants/CategoryAlertIssue.constants";
import { CATEGORY_ALERT_ERROR_COPY } from "../constants/CategoryAlertErrorCopy.constants";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { CATEGORY_MUTATION_STATUS } from "../constants/CategoryMutationStatus.constants";
import type { CategoryAlertFieldHandlers } from "../models/CategoryAlertFieldHandlers.interface";
import type { CategoryAlertFormErrors } from "../models/CategoryAlertFormErrors.interface";
import {
  buildCategoryAlertFormValues,
  buildUpdateCategoryAlertsInput,
  DEFAULT_EXPIRY_DAYS,
  DEFAULT_MIN_QUANTITY,
} from "./CategoryAlerts.constants";

export const SUCCESS_RESULT = {
  status: CATEGORY_MUTATION_STATUS.SUCCESS,
};

export const FAKE_ACTION_FAILURE_MESSAGE =
  "fake-alert-action-failure";
export const FAKE_CONTROL_FLOW_SIGNAL_MESSAGE =
  "fake-control-flow-signal";
export const INVALID_ALERT_TEXT = "abc";
export const SUBMISSIONS_AFTER_RELEASE = 2;
export const EDITED_MIN_QUANTITY_TEXT = "12";
export const EDITED_MIN_QUANTITY = 12;
export const EDITED_EXPIRY_DAYS_TEXT = "14";
export const EDITED_EXPIRY_DAYS = 14;

export const NOT_INTEGER_ERRORS: Required<CategoryAlertFormErrors> =
  {
    minQuantityText:
      CATEGORY_ALERT_ERROR_COPY.minQuantityText[
        CATEGORY_ALERT_ISSUE.NOT_INTEGER
      ],
    expiryDaysText:
      CATEGORY_ALERT_ERROR_COPY.expiryDaysText[
        CATEGORY_ALERT_ISSUE.NOT_INTEGER
      ],
  };

export const TEXT_FIELD_CASES: Array<{
  field: keyof CategoryAlertFormErrors;
  otherField: keyof CategoryAlertFormErrors;
  change: keyof CategoryAlertFieldHandlers;
}> = [
  {
    field: "minQuantityText",
    otherField: "expiryDaysText",
    change: "onMinQuantityChange",
  },
  {
    field: "expiryDaysText",
    otherField: "minQuantityText",
    change: "onExpiryDaysChange",
  },
];

export const SUBMIT_CASES_BY_TYPE = [
  {
    values: buildCategoryAlertFormValues({
      alertType: CATEGORY_ALERT_TYPE.NONE,
    }),
    input: buildUpdateCategoryAlertsInput({
      alertMinQuantity: null,
      alertExpiryDays: null,
    }),
  },
  {
    values: buildCategoryAlertFormValues({
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
    }),
    input: buildUpdateCategoryAlertsInput({
      alertMinQuantity: DEFAULT_MIN_QUANTITY,
      alertExpiryDays: null,
    }),
  },
  {
    values: buildCategoryAlertFormValues({
      alertType: CATEGORY_ALERT_TYPE.EXPIRY,
    }),
    input: buildUpdateCategoryAlertsInput({
      alertMinQuantity: null,
      alertExpiryDays: DEFAULT_EXPIRY_DAYS,
    }),
  },
  {
    values: buildCategoryAlertFormValues(),
    input: buildUpdateCategoryAlertsInput(),
  },
].map((submitCase) => ({
  ...submitCase,
  description: submitCase.values.alertType,
}));
