import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import { applyHasMotorChange } from "../utils/applyHasMotorChange";
import { UNKNOWN_USAGE_METRIC_TEXT } from "./CategoryBehaviorFormRules.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

describe("applyHasMotorChange", () => {
  it("clears the usage metric when the motor is turned off", () => {
    const values = applyHasMotorChange(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      false
    );

    expect(values.hasMotor).toBe(false);
    expect(values.usageMetric).toBe(STRING.Empty);
  });

  it("defaults the usage metric to engine hours when the motor is turned on from empty", () => {
    const values = applyHasMotorChange(
      {
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        hasMotor: false,
        usageMetric: STRING.Empty,
      },
      true
    );

    expect(values.hasMotor).toBe(true);
    expect(values.usageMetric).toBe(
      USAGE_METRIC.ENGINE_HOURS
    );
  });

  it("keeps a valid usage metric already present", () => {
    const values = applyHasMotorChange(
      {
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        usageMetric: USAGE_METRIC.KILOMETERS,
      },
      true
    );

    expect(values.usageMetric).toBe(
      USAGE_METRIC.KILOMETERS
    );
  });

  it("defaults an unknown usage metric to engine hours", () => {
    const values = applyHasMotorChange(
      {
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        usageMetric: UNKNOWN_USAGE_METRIC_TEXT,
      },
      true
    );

    expect(values.usageMetric).toBe(
      USAGE_METRIC.ENGINE_HOURS
    );
  });

  it("leaves every other field untouched", () => {
    const values = applyHasMotorChange(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      false
    );

    expect(values).toEqual({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      hasMotor: false,
      usageMetric: STRING.Empty,
    });
  });

  it("does not mutate the input", () => {
    const frozenValues = Object.freeze({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
    });

    const values = applyHasMotorChange(frozenValues, false);

    expect(values).not.toBe(frozenValues);
    expect(frozenValues).toEqual(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );
  });
});
