import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { mapCategoryBehaviorToFormValues } from "../utils/mapCategoryBehaviorToFormValues";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import {
  ALL_FLAGS_OFF,
  CATEGORY_BEHAVIOR_FLAG_FIELDS,
} from "./CategoryBehaviorFlagFields.constants";
import {
  CUSTOM_DURATION_MINUTES,
  CUSTOM_DURATION_TEXT,
} from "./CategoryBehaviorFormRules.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

describe("mapCategoryBehaviorToFormValues", () => {
  it("maps the default behavior to the valid form values", () => {
    const formValues = mapCategoryBehaviorToFormValues(
      DEFAULT_CATEGORY_BEHAVIOR
    );

    expect(formValues).toEqual(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );
  });

  it.each([null, undefined])(
    "maps a %s usage metric to an empty string",
    (usageMetric) => {
      const behavior = {
        ...DEFAULT_CATEGORY_BEHAVIOR,
        usageMetric,
      };

      const formValues =
        mapCategoryBehaviorToFormValues(behavior);

      expect(formValues.usageMetric).toBe(STRING.Empty);
    }
  );

  it.each([null, undefined])(
    "maps a %s duration to an empty string",
    (defaultDurationMinutes) => {
      const behavior = {
        ...DEFAULT_CATEGORY_BEHAVIOR,
        defaultDurationMinutes,
      };

      const formValues =
        mapCategoryBehaviorToFormValues(behavior);

      expect(formValues.defaultDurationMinutes).toBe(
        STRING.Empty
      );
    }
  );

  it("maps a numeric duration to its decimal string", () => {
    const behavior = {
      ...DEFAULT_CATEGORY_BEHAVIOR,
      defaultDurationMinutes: CUSTOM_DURATION_MINUTES,
    };

    const formValues =
      mapCategoryBehaviorToFormValues(behavior);

    expect(formValues.defaultDurationMinutes).toBe(
      CUSTOM_DURATION_TEXT
    );
  });

  it.each([
    [CATEGORY_TRACKING_MODE.BY_QUANTITY, false, true],
    [CATEGORY_TRACKING_MODE.BY_QUANTITY, true, true],
    [CATEGORY_TRACKING_MODE.BY_UNIT, false, false],
    [CATEGORY_TRACKING_MODE.BY_UNIT, true, true],
  ] as const)(
    "for %s with stored interchangeable %s the form value is %s",
    (trackingMode, stored, expected) => {
      const behavior = {
        ...DEFAULT_CATEGORY_BEHAVIOR,
        trackingMode,
        unitsAreInterchangeable: stored,
      };

      const formValues =
        mapCategoryBehaviorToFormValues(behavior);

      expect(formValues.unitsAreInterchangeable).toBe(
        expected
      );
    }
  );

  it.each(["trackingMode", "id"])(
    "does not expose %s in the form values",
    (excludedField) => {
      const formValues = mapCategoryBehaviorToFormValues(
        DEFAULT_CATEGORY_BEHAVIOR
      );

      expect(formValues).not.toHaveProperty(excludedField);
    }
  );

  it.each(CATEGORY_BEHAVIOR_FLAG_FIELDS)(
    "maps %s only to its own form field",
    (field) => {
      const behavior = {
        ...DEFAULT_CATEGORY_BEHAVIOR,
        ...ALL_FLAGS_OFF,
        [field]: true,
      };

      const formValues =
        mapCategoryBehaviorToFormValues(behavior);

      const enabledFields =
        CATEGORY_BEHAVIOR_FLAG_FIELDS.filter(
          (booleanField) =>
            formValues[booleanField] === true
        );
      expect(enabledFields).toEqual([field]);
    }
  );
});
