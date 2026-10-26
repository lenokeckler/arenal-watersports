import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapCategoryBehaviorToFormValues } from "../utils/mapCategoryBehaviorToFormValues";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

const BOOLEAN_FIELDS = [
  "isReservable",
  "hasMotor",
  "consumesFuel",
  "canBeDamaged",
  "hasConditionPhotos",
  "guideOnly",
  "unitsAreInterchangeable",
] as const;

const ALL_FLAGS_OFF_BEHAVIOR = {
  ...DEFAULT_CATEGORY_BEHAVIOR,
  isReservable: false,
  hasMotor: false,
  consumesFuel: false,
  canBeDamaged: false,
  hasConditionPhotos: false,
  guideOnly: false,
  unitsAreInterchangeable: false,
};

const CUSTOM_DURATION_MINUTES = 45;
const CUSTOM_DURATION_TEXT = "45";

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

  it.each(["trackingMode", "id"])(
    "does not expose %s in the form values",
    (excludedField) => {
      const formValues = mapCategoryBehaviorToFormValues(
        DEFAULT_CATEGORY_BEHAVIOR
      );

      expect(formValues).not.toHaveProperty(excludedField);
    }
  );

  it.each(BOOLEAN_FIELDS)(
    "maps %s only to its own form field",
    (field) => {
      const behavior = {
        ...ALL_FLAGS_OFF_BEHAVIOR,
        [field]: true,
      };

      const formValues =
        mapCategoryBehaviorToFormValues(behavior);

      const enabledFields = BOOLEAN_FIELDS.filter(
        (booleanField) => formValues[booleanField] === true
      );
      expect(enabledFields).toEqual([field]);
    }
  );
});
