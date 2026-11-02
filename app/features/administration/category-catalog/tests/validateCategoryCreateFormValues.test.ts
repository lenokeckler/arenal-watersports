import { describe, expect, it } from "vitest";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { validateCategoryCreateFormValues } from "../utils/validateCategoryCreateFormValues";
import { VALID_CATEGORY_CREATE_FORM_VALUES } from "./CategoryCreateFormValues.constants";

describe("validateCategoryCreateFormValues", () => {
  it("returns no errors when every field is filled validly", () => {
    const errors = validateCategoryCreateFormValues(
      VALID_CATEGORY_CREATE_FORM_VALUES
    );

    expect(errors).toEqual({});
  });

  it("flags an empty name only", () => {
    const errors = validateCategoryCreateFormValues({
      ...VALID_CATEGORY_CREATE_FORM_VALUES,
      name: "",
    });

    expect(errors).toEqual({
      name: CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR,
    });
  });

  it("flags a whitespace-only name as empty", () => {
    const errors = validateCategoryCreateFormValues({
      ...VALID_CATEGORY_CREATE_FORM_VALUES,
      name: "   ",
    });

    expect(errors).toEqual({
      name: CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR,
    });
  });

  it("flags an empty tracking mode only", () => {
    const errors = validateCategoryCreateFormValues({
      ...VALID_CATEGORY_CREATE_FORM_VALUES,
      trackingMode: "",
    });

    expect(errors).toEqual({
      trackingMode:
        CATEGORY_CATALOG_COPY.TRACKING_MODE_REQUIRED_ERROR,
    });
  });

  it("flags both the name and the tracking mode when both are empty", () => {
    const errors = validateCategoryCreateFormValues({
      ...VALID_CATEGORY_CREATE_FORM_VALUES,
      name: "",
      trackingMode: "",
    });

    expect(errors).toEqual({
      name: CATEGORY_CATALOG_COPY.NAME_FIELD_REQUIRED_ERROR,
      trackingMode:
        CATEGORY_CATALOG_COPY.TRACKING_MODE_REQUIRED_ERROR,
    });
  });

  it("never flags an empty group name", () => {
    const errors = validateCategoryCreateFormValues({
      ...VALID_CATEGORY_CREATE_FORM_VALUES,
      groupName: "",
    });

    expect(errors).toEqual({});
  });
});
