import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { CategoryBehaviorFormValues } from "../models/CategoryBehaviorFormValues.interface";
import { applyHasMotorChange } from "../utils/applyHasMotorChange";
import { applyUsageMetricChange } from "../utils/applyUsageMetricChange";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

type FormValuesAction = (
  values: CategoryBehaviorFormValues
) => CategoryBehaviorFormValues;

const UNKNOWN_METRIC_TEXT = "furlongs";

const STARTING_MOTOR_STATES: [
  string,
  Partial<CategoryBehaviorFormValues>,
][] = [
  [
    "no motor",
    { hasMotor: false, usageMetric: STRING.Empty },
  ],
  [
    "motor with engine hours",
    {
      hasMotor: true,
      usageMetric: USAGE_METRIC.ENGINE_HOURS,
    },
  ],
  [
    "motor with kilometers",
    {
      hasMotor: true,
      usageMetric: USAGE_METRIC.KILOMETERS,
    },
  ],
];

const MOTOR_ACTIONS: [string, FormValuesAction][] = [
  [
    "turn the motor on",
    (values) => applyHasMotorChange(values, true),
  ],
  [
    "turn the motor off",
    (values) => applyHasMotorChange(values, false),
  ],
  [
    "pick kilometers",
    (values) =>
      applyUsageMetricChange(
        values,
        USAGE_METRIC.KILOMETERS
      ),
  ],
  [
    "pick engine hours",
    (values) =>
      applyUsageMetricChange(
        values,
        USAGE_METRIC.ENGINE_HOURS
      ),
  ],
  [
    "clear the metric",
    (values) =>
      applyUsageMetricChange(values, STRING.Empty),
  ],
  [
    "type an unknown metric",
    (values) =>
      applyUsageMetricChange(values, UNKNOWN_METRIC_TEXT),
  ],
];

const hasMetric = (
  values: CategoryBehaviorFormValues
): boolean => values.usageMetric !== STRING.Empty;

describe("category motor invariant", () => {
  describe.each(STARTING_MOTOR_STATES)(
    "starting from %s",
    (_stateName, startingState) => {
      it.each(MOTOR_ACTIONS)(
        "keeps both motor checks after: %s",
        (_actionName, action) => {
          const values = action({
            ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
            ...startingState,
          });

          expect(
            !values.hasMotor || hasMetric(values)
          ).toBe(true);
          expect(
            !hasMetric(values) || values.hasMotor
          ).toBe(true);
        }
      );
    }
  );
});
