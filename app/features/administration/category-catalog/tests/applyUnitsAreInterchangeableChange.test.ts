import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { applyUnitsAreInterchangeableChange } from "../utils/applyUnitsAreInterchangeableChange";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

const INTERCHANGEABLE = {
  ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
  unitsAreInterchangeable: true,
};

const NOT_INTERCHANGEABLE = {
  ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
  unitsAreInterchangeable: false,
};

describe("applyUnitsAreInterchangeableChange", () => {
  it("turns the flag on when tracking by unit", () => {
    const values = applyUnitsAreInterchangeableChange(
      NOT_INTERCHANGEABLE,
      true,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(values.unitsAreInterchangeable).toBe(true);
  });

  it("turns the flag off when tracking by unit", () => {
    const values = applyUnitsAreInterchangeableChange(
      INTERCHANGEABLE,
      false,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(values.unitsAreInterchangeable).toBe(false);
  });

  it("keeps the flag on when asked to turn it off by quantity", () => {
    const values = applyUnitsAreInterchangeableChange(
      INTERCHANGEABLE,
      false,
      CATEGORY_TRACKING_MODE.BY_QUANTITY
    );

    expect(values.unitsAreInterchangeable).toBe(true);
  });

  it("forces the flag on when tracking by quantity", () => {
    const values = applyUnitsAreInterchangeableChange(
      NOT_INTERCHANGEABLE,
      false,
      CATEGORY_TRACKING_MODE.BY_QUANTITY
    );

    expect(values.unitsAreInterchangeable).toBe(true);
  });

  it("leaves every other field untouched", () => {
    const values = applyUnitsAreInterchangeableChange(
      INTERCHANGEABLE,
      false,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(values).toEqual(NOT_INTERCHANGEABLE);
  });
});
