import { describe, expect, it } from "vitest";
import { CATEGORY_ALERT_TYPE } from "../constants/CategoryAlertType.constants";
import { isCategoryAlertTypeChoiceSelected } from "../utils/isCategoryAlertTypeChoiceSelected";

const { BOTH, EXPIRY, NONE } = CATEGORY_ALERT_TYPE;

describe("isCategoryAlertTypeChoiceSelected", () => {
  it.each([
    [EXPIRY, BOTH, true],
    [NONE, BOTH, false],
    [EXPIRY, EXPIRY, true],
    [EXPIRY, NONE, false],
  ])(
    "choice %s with alert type %s is %s",
    (choiceType, alertType, expected) => {
      expect(
        isCategoryAlertTypeChoiceSelected(
          choiceType,
          alertType
        )
      ).toBe(expected);
    }
  );
});
