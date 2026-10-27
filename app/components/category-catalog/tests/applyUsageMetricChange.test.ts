import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import { applyUsageMetricChange } from "../utils/applyUsageMetricChange";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

const UNKNOWN_METRIC_TEXT = "furlongs";

const MOTORLESS_FORM_VALUES = {
  ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
  hasMotor: false,
  usageMetric: STRING.Empty,
};

describe("applyUsageMetricChange", () => {
  it("ignores a valid metric while the motor is off", () => {
    const values = applyUsageMetricChange(
      MOTORLESS_FORM_VALUES,
      USAGE_METRIC.KILOMETERS
    );

    expect(values).toBe(MOTORLESS_FORM_VALUES);
  });

  it.each([STRING.Empty, UNKNOWN_METRIC_TEXT])(
    "ignores the metric text %j while the motor is on",
    (rawUsageMetric) => {
      const values = applyUsageMetricChange(
        VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        rawUsageMetric
      );

      expect(values).toBe(
        VALID_CATEGORY_BEHAVIOR_FORM_VALUES
      );
    }
  );

  it.each(Object.values(USAGE_METRIC))(
    "applies the metric %s and leaves every other field untouched",
    (usageMetric) => {
      const values = applyUsageMetricChange(
        VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        usageMetric
      );

      expect(values).toEqual({
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        usageMetric,
      });
    }
  );

  it("does not mutate the input", () => {
    const frozenValues = Object.freeze({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
    });

    const values = applyUsageMetricChange(
      frozenValues,
      USAGE_METRIC.KILOMETERS
    );

    expect(values).not.toBe(frozenValues);
    expect(frozenValues).toEqual(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );
  });
});
