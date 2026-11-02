import { describe, expect, it } from "vitest";
import { DEFAULT_DURATION_MINUTES_MAX } from "../constants/CategoryBehaviorValidation.constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { mapCategoryBehaviorFormValuesToInput } from "../utils/mapCategoryBehaviorFormValuesToInput";
import { mapCategoryBehaviorToFormValues } from "../utils/mapCategoryBehaviorToFormValues";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { CATEGORY_BEHAVIOR_FLAG_FIELDS } from "./CategoryBehaviorFlagFields.constants";

const ONE_MINUTE = 1;

const USAGE_METRICS = [
  null,
  undefined,
  ...Object.values(USAGE_METRIC),
];

const DURATIONS = [
  null,
  undefined,
  ONE_MINUTE,
  DEFAULT_DURATION_MINUTES_MAX,
];

const INVERTED_FLAGS = Object.fromEntries(
  CATEGORY_BEHAVIOR_FLAG_FIELDS.map((flagField) => [
    flagField,
    !DEFAULT_CATEGORY_BEHAVIOR[flagField],
  ])
);

const FLAG_SETS = [{}, INVERTED_FLAGS];

const BEHAVIORS: CategoryBehavior[] = FLAG_SETS.flatMap(
  (flags) =>
    USAGE_METRICS.flatMap((usageMetric) =>
      DURATIONS.map((defaultDurationMinutes) => ({
        ...DEFAULT_CATEGORY_BEHAVIOR,
        ...flags,
        usageMetric,
        defaultDurationMinutes,
      }))
    )
);

const roundTrip = (behavior: CategoryBehavior) =>
  mapCategoryBehaviorFormValuesToInput(
    behavior.id,
    mapCategoryBehaviorToFormValues(behavior)
  );

describe("category behavior round trip", () => {
  it.each(BEHAVIORS)(
    "returns the stored behavior unchanged: %j",
    (behavior) => {
      const input = roundTrip(behavior);

      expect(input.categoryId).toBe(behavior.id);
      expect(input.usageMetric).toBe(
        behavior.usageMetric ?? null
      );
      expect(input.defaultDurationMinutes).toBe(
        behavior.defaultDurationMinutes ?? null
      );
      CATEGORY_BEHAVIOR_FLAG_FIELDS.forEach((flagField) => {
        expect(input[flagField]).toBe(behavior[flagField]);
      });
    }
  );

  it("drops a duration above the integer column ceiling", () => {
    const input = roundTrip({
      ...DEFAULT_CATEGORY_BEHAVIOR,
      defaultDurationMinutes:
        DEFAULT_DURATION_MINUTES_MAX + ONE_MINUTE,
    });

    expect(input.defaultDurationMinutes).toBeNull();
  });
});
