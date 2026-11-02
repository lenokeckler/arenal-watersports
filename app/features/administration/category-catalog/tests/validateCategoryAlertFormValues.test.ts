import { describe, expect, it } from "vitest";
import { CATEGORY_ALERT_ERROR_COPY } from "../constants/CategoryAlertErrorCopy.constants";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { validateCategoryAlertFormValues } from "../utils/validateCategoryAlertFormValues";
import {
  ALERT_FIELDS,
  ALERT_TEXT_CASES,
} from "./CategoryAlertCases.constants";
import { buildCategoryAlertFormValues } from "./CategoryAlerts.constants";

const BLANK_TEXT = "";
const INVALID_TEXT = "abc";

describe("validateCategoryAlertFormValues", () => {
  describe.each(ALERT_FIELDS)("the %s field", (field) => {
    it.each(ALERT_TEXT_CASES)(
      "judges $description",
      ({ text, expectedIssue }) => {
        const expectedErrors = expectedIssue
          ? {
              [field]:
                CATEGORY_ALERT_ERROR_COPY[field][
                  expectedIssue
                ],
            }
          : {};

        expect(
          validateCategoryAlertFormValues(
            buildCategoryAlertFormValues({ [field]: text })
          )
        ).toStrictEqual(expectedErrors);
      }
    );
  });

  it.each([
    {
      alertType: CATEGORY_ALERT_TYPE.NONE,
      expectedFields: [],
    },
    {
      alertType: CATEGORY_ALERT_TYPE.QUANTITY,
      expectedFields: ["minQuantityText"],
    },
    {
      alertType: CATEGORY_ALERT_TYPE.EXPIRY,
      expectedFields: ["expiryDaysText"],
    },
    {
      alertType: CATEGORY_ALERT_TYPE.BOTH,
      expectedFields: ["expiryDaysText", "minQuantityText"],
    },
  ])(
    "judges only the fields that apply to the $alertType type",
    ({ alertType, expectedFields }) => {
      const errors = validateCategoryAlertFormValues(
        buildCategoryAlertFormValues({
          alertType,
          minQuantityText: BLANK_TEXT,
          expiryDaysText: INVALID_TEXT,
        })
      );

      expect(Object.keys(errors).sort()).toEqual(
        expectedFields
      );
    }
  );
});
