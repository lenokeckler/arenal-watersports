import { describe, expect, it } from "vitest";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { mapCategoryAlertsToFormValues } from "../utils/mapCategoryAlertsToFormValues";
import {
  buildCategoryAlerts,
  DEFAULT_CATEGORY_ALERT_FORM_VALUES,
  DEFAULT_CATEGORY_ALERTS,
} from "./CategoryAlerts.constants";

const EMPTY_TEXT = "";

describe("mapCategoryAlertsToFormValues", () => {
  it("maps both stored numbers to the both type and their texts", () => {
    expect(
      mapCategoryAlertsToFormValues(DEFAULT_CATEGORY_ALERTS)
    ).toEqual(DEFAULT_CATEGORY_ALERT_FORM_VALUES);
  });

  it("maps null values to the none type and empty texts", () => {
    expect(
      mapCategoryAlertsToFormValues(
        buildCategoryAlerts({
          alertMinQuantity: null,
          alertExpiryDays: null,
        })
      )
    ).toEqual({
      alertType: CATEGORY_ALERT_TYPE.NONE,
      minQuantityText: EMPTY_TEXT,
      expiryDaysText: EMPTY_TEXT,
    });
  });

  it("keeps the empty text of the field that is null", () => {
    expect(
      mapCategoryAlertsToFormValues(
        buildCategoryAlerts({ alertExpiryDays: null })
      )
    ).toMatchObject({
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      expiryDaysText: EMPTY_TEXT,
    });
  });
});
