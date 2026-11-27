import { describe, expect, it } from "vitest";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { applyCategoryAlertValues } from "../utils/applyCategoryAlertValues";
import {
  buildCategoryAlertFormValues,
  DEFAULT_CATEGORY_ALERTS,
} from "./CategoryAlerts.constants";
import {
  buildCategoryConfiguration,
  FAKE_INVALID_AMOUNT_TEXT,
} from "./CategoryConfiguration.constants";
import {
  EDITED_EXPIRY_DAYS,
  EDITED_EXPIRY_DAYS_TEXT,
  EDITED_MIN_QUANTITY,
  EDITED_MIN_QUANTITY_TEXT,
} from "./useCategoryAlertForm.constants";

const { BOTH, EXPIRY, NONE, QUANTITY } =
  CATEGORY_ALERT_TYPE;

const SAVED_CONFIGURATION = buildCategoryConfiguration({
  alerts: DEFAULT_CATEGORY_ALERTS,
});

const ALERT_TYPE_CASES = [
  {
    alertType: NONE,
    alertMinQuantity: null,
    alertExpiryDays: null,
  },
  {
    alertType: QUANTITY,
    alertMinQuantity: EDITED_MIN_QUANTITY,
    alertExpiryDays: null,
  },
  {
    alertType: EXPIRY,
    alertMinQuantity: null,
    alertExpiryDays: EDITED_EXPIRY_DAYS,
  },
  {
    alertType: BOTH,
    alertMinQuantity: EDITED_MIN_QUANTITY,
    alertExpiryDays: EDITED_EXPIRY_DAYS,
  },
];

describe("applyCategoryAlertValues", () => {
  it.each(ALERT_TYPE_CASES)(
    "applies the edited numbers the $alertType type includes over the saved ones",
    ({ alertType, ...expected }) => {
      const result = applyCategoryAlertValues(
        SAVED_CONFIGURATION,
        buildCategoryAlertFormValues({
          alertType,
          minQuantityText: EDITED_MIN_QUANTITY_TEXT,
          expiryDaysText: EDITED_EXPIRY_DAYS_TEXT,
        })
      );

      expect(result.alerts).toEqual({
        ...DEFAULT_CATEGORY_ALERTS,
        ...expected,
      });
    }
  );

  it("turns text that is not a number into null instead of NaN", () => {
    const result = applyCategoryAlertValues(
      SAVED_CONFIGURATION,
      buildCategoryAlertFormValues({
        alertType: BOTH,
        minQuantityText: FAKE_INVALID_AMOUNT_TEXT,
        expiryDaysText: FAKE_INVALID_AMOUNT_TEXT,
      })
    );

    expect(result.alerts).toEqual({
      ...DEFAULT_CATEGORY_ALERTS,
      alertMinQuantity: null,
      alertExpiryDays: null,
    });
  });

  it("leaves the rest of the configuration untouched", () => {
    const result = applyCategoryAlertValues(
      SAVED_CONFIGURATION,
      buildCategoryAlertFormValues()
    );

    expect({ ...result, alerts: null }).toEqual({
      ...SAVED_CONFIGURATION,
      alerts: null,
    });
  });
});
