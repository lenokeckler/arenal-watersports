import { describe, expect, it } from "vitest";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { mapCategoryAlertFormValuesToInput } from "../utils/mapCategoryAlertFormValuesToInput";
import {
  buildCategoryAlertFormValues,
  CATEGORY_ALERT_ID,
  DEFAULT_UPDATE_CATEGORY_ALERTS_INPUT,
} from "./CategoryAlerts.constants";

const PADDED_TEXT = " 12 ";
const PADDED_VALUE = 12;

describe("mapCategoryAlertFormValuesToInput", () => {
  it.each([
    {
      alertType: CATEGORY_ALERT_TYPE.NONE,
      quantity: null,
      days: null,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      quantity: PADDED_VALUE,
      days: null,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.EXPIRY,
      quantity: null,
      days: PADDED_VALUE,
    },
    {
      alertType: CATEGORY_ALERT_TYPE.BOTH,
      quantity: PADDED_VALUE,
      days: PADDED_VALUE,
    },
  ])(
    "sends null for the fields that do not apply to the $alertType type",
    ({ alertType, quantity, days }) => {
      expect(
        mapCategoryAlertFormValuesToInput(
          CATEGORY_ALERT_ID,
          buildCategoryAlertFormValues({
            alertType,
            minQuantityText: PADDED_TEXT,
            expiryDaysText: PADDED_TEXT,
          })
        )
      ).toEqual({
        categoryId: CATEGORY_ALERT_ID,
        alertMinQuantity: quantity,
        alertExpiryDays: days,
      });
    }
  );

  it("parses both applicable numbers", () => {
    expect(
      mapCategoryAlertFormValuesToInput(
        CATEGORY_ALERT_ID,
        buildCategoryAlertFormValues()
      )
    ).toEqual(DEFAULT_UPDATE_CATEGORY_ALERTS_INPUT);
  });
});
