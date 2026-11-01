import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { applyHasConditionPhotosChange } from "../utils/applyHasConditionPhotosChange";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

const WITHOUT_PHOTOS = {
  ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
  hasConditionPhotos: false,
};

const WITH_PHOTOS = {
  ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
  hasConditionPhotos: true,
};

describe("applyHasConditionPhotosChange", () => {
  it("turns the flag on when tracking by unit", () => {
    const values = applyHasConditionPhotosChange(
      WITHOUT_PHOTOS,
      true,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(values.hasConditionPhotos).toBe(true);
  });

  it("turns the flag off when tracking by unit", () => {
    const values = applyHasConditionPhotosChange(
      WITH_PHOTOS,
      false,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(values.hasConditionPhotos).toBe(false);
  });

  it("ignores turning the flag on when tracking by quantity", () => {
    const values = applyHasConditionPhotosChange(
      WITHOUT_PHOTOS,
      true,
      CATEGORY_TRACKING_MODE.BY_QUANTITY
    );

    expect(values).toBe(WITHOUT_PHOTOS);
  });

  it("allows turning the flag off when tracking by quantity", () => {
    const values = applyHasConditionPhotosChange(
      WITH_PHOTOS,
      false,
      CATEGORY_TRACKING_MODE.BY_QUANTITY
    );

    expect(values.hasConditionPhotos).toBe(false);
  });

  it("leaves every other field untouched", () => {
    const values = applyHasConditionPhotosChange(
      WITHOUT_PHOTOS,
      true,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(values).toEqual({
      ...WITHOUT_PHOTOS,
      hasConditionPhotos: true,
    });
  });

  it("does not mutate the input", () => {
    const frozenValues = Object.freeze({
      ...WITHOUT_PHOTOS,
    });

    const values = applyHasConditionPhotosChange(
      frozenValues,
      true,
      CATEGORY_TRACKING_MODE.BY_UNIT
    );

    expect(values).not.toBe(frozenValues);
    expect(frozenValues).toEqual(WITHOUT_PHOTOS);
  });
});
