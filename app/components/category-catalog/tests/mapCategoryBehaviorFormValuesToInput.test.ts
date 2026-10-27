import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { mapCategoryBehaviorFormValuesToInput } from "../utils/mapCategoryBehaviorFormValuesToInput";
import { CATEGORY_BEHAVIOR_FLAG_FIELDS } from "./CategoryBehaviorFlagFields.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";
import {
  DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT,
  FAKE_DEFAULT_DURATION_MINUTES,
  FAKE_UPDATE_CATEGORY_ID,
} from "./UpdateCategoryBehaviorInput.constants";

const OTHER_CATEGORY_ID = "fake-other-category-id";
const UNKNOWN_METRIC_TEXT = "furlongs";
const BLANK_DURATION_TEXT = "   ";
const INVALID_DURATION_TEXT = "abc";
const PADDED_DURATION_TEXT = "  45  ";
const PADDED_DURATION_MINUTES = 45;

const ALL_FLAGS_OFF_FORM_VALUES = {
  ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
  isReservable: false,
  hasMotor: false,
  consumesFuel: false,
  canBeDamaged: false,
  hasConditionPhotos: false,
  guideOnly: false,
  unitsAreInterchangeable: false,
};

describe("mapCategoryBehaviorFormValuesToInput", () => {
  it("maps the valid form values to the default input", () => {
    const input = mapCategoryBehaviorFormValuesToInput(
      FAKE_UPDATE_CATEGORY_ID,
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );

    expect(input).toEqual(
      DEFAULT_UPDATE_CATEGORY_BEHAVIOR_INPUT
    );
  });

  it("passes the category id through", () => {
    const input = mapCategoryBehaviorFormValuesToInput(
      OTHER_CATEGORY_ID,
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );

    expect(input.categoryId).toBe(OTHER_CATEGORY_ID);
  });

  it.each([STRING.Empty, UNKNOWN_METRIC_TEXT])(
    "maps the usage metric text %j to null",
    (usageMetric) => {
      const input = mapCategoryBehaviorFormValuesToInput(
        FAKE_UPDATE_CATEGORY_ID,
        {
          ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
          usageMetric,
        }
      );

      expect(input.usageMetric).toBeNull();
    }
  );

  it.each([STRING.Empty, BLANK_DURATION_TEXT])(
    "maps the blank duration %j to null",
    (defaultDurationMinutes) => {
      const input = mapCategoryBehaviorFormValuesToInput(
        FAKE_UPDATE_CATEGORY_ID,
        {
          ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
          defaultDurationMinutes,
        }
      );

      expect(input.defaultDurationMinutes).toBeNull();
    }
  );

  it("trims and parses a padded duration", () => {
    const input = mapCategoryBehaviorFormValuesToInput(
      FAKE_UPDATE_CATEGORY_ID,
      {
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        defaultDurationMinutes: PADDED_DURATION_TEXT,
      }
    );

    expect(input.defaultDurationMinutes).toBe(
      PADDED_DURATION_MINUTES
    );
  });

  it("keeps a valid duration on a non-reservable category", () => {
    const input = mapCategoryBehaviorFormValuesToInput(
      FAKE_UPDATE_CATEGORY_ID,
      {
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        isReservable: false,
      }
    );

    expect(input.defaultDurationMinutes).toBe(
      FAKE_DEFAULT_DURATION_MINUTES
    );
  });

  it("maps an invalid duration on a non-reservable category to null", () => {
    const input = mapCategoryBehaviorFormValuesToInput(
      FAKE_UPDATE_CATEGORY_ID,
      {
        ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
        isReservable: false,
        defaultDurationMinutes: INVALID_DURATION_TEXT,
      }
    );

    expect(input.defaultDurationMinutes).toBeNull();
  });

  it.each(CATEGORY_BEHAVIOR_FLAG_FIELDS)(
    "maps %s only to its own input field",
    (flagField) => {
      const input = mapCategoryBehaviorFormValuesToInput(
        FAKE_UPDATE_CATEGORY_ID,
        { ...ALL_FLAGS_OFF_FORM_VALUES, [flagField]: true }
      );

      const enabledFields =
        CATEGORY_BEHAVIOR_FLAG_FIELDS.filter(
          (booleanField) => input[booleanField] === true
        );
      expect(enabledFields).toEqual([flagField]);
    }
  );
});
