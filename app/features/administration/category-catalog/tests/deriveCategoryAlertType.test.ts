import { describe, expect, it } from "vitest";
import { deriveCategoryAlertType } from "../utils/deriveCategoryAlertType";
import { ALERT_TYPE_BY_STORED_VALUES } from "./CategoryAlertCases.constants";

describe("deriveCategoryAlertType", () => {
  it.each(ALERT_TYPE_BY_STORED_VALUES)(
    "derives $alertType from quantity $alertMinQuantity and days $alertExpiryDays",
    ({ alertMinQuantity, alertExpiryDays, alertType }) => {
      expect(
        deriveCategoryAlertType(
          alertMinQuantity,
          alertExpiryDays
        )
      ).toBe(alertType);
    }
  );
});
