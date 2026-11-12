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

  it("accepts a duration with a leading plus sign", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "+5",
    });

    expect(errors).toEqual({});
  });

  it("accepts a duration with leading zeros", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "007",
    });

    expect(errors).toEqual({});
  });

  it("accepts a duration written in scientific notation", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "1e2",
    });

    expect(errors).toEqual({});
  });

  it("accepts a duration written in hexadecimal notation", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "0x5",
    });

    expect(errors).toEqual({});
  });

  it("accepts a duration written with a trailing decimal zero", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "60.0",
    });

    expect(errors).toEqual({});
  });

  it("flags an infinite duration", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "Infinity",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a duration that overflows to infinity", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "1e309",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a negative zero duration", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "-0",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a decimal duration whose magnitude loses precision past Number.MAX_SAFE_INTEGER", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "9007199254740993.5",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("flags a duration past the integer column's ceiling", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "2147483648",
    });

    expect(errors).toEqual({
      defaultDurationMinutes:
        CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
    });
  });

  it("accepts a duration at the integer column's ceiling", () => {
    const errors = validateCategoryBehaviorFormValues({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      defaultDurationMinutes: "2147483647",
    });

    expect(errors).toEqual({});
  });
});
