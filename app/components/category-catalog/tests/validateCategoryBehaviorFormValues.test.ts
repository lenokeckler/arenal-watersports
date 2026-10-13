import { describe, expect, it } from "vitest";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { validateCategoryBehaviorFormValues } from "../utils/validateCategoryBehaviorFormValues";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

describe("validateCategoryBehaviorFormValues", () => {
  it("returns no errors when every field is filled validly", () => {
    const errors = validateCategoryBehaviorFormValues(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );

    expect(errors).toEqual({});
  });

  it("never flags the duration when the category is not reservable", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      isReservable: false,
      defaultDurationMinutes: "",
    });

    expect(errors).toEqual({});
  });

  it("flags an empty duration when the category is reservable", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a whitespace-only duration as empty", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "   ",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a zero duration", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "0",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a negative duration", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "-5",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a non-integer duration", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "12.5",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a non-numeric duration", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "abc",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("accepts a duration surrounded by whitespace", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: " 60 ",
    });

    expect(errors).toEqual({});
  });
});
