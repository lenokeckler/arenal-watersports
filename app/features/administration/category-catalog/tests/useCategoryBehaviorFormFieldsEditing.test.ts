import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CATEGORY_CATALOG_COPY } from "../constants/CategoryCatalogCopy.constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { useCategoryBehaviorFormFields } from "../hooks/useCategoryBehaviorFormFields";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

const FAKE_EDITED_DURATION = "90";

const renderFields = (
  overrides: Partial<CategoryBehavior> = {}
) =>
  renderHook(() =>
    useCategoryBehaviorFormFields({
      behavior: {
        ...DEFAULT_CATEGORY_BEHAVIOR,
        ...overrides,
      },
    })
  );

describe("useCategoryBehaviorFormFields editing", () => {
  it("ignores condition photos on a by_quantity category", () => {
    const { result } = renderFields({
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    });

    act(() => {
      result.current.onHasConditionPhotosChange(
        buildCategoryFormFieldChangeEvent({ checked: true })
      );
    });

    expect(result.current.values.hasConditionPhotos).toBe(
      false
    );
  });

  it("writes a plain checkbox to its own field only", () => {
    const { result } = renderFields();

    act(() => {
      result.current.onGuideOnlyChange(
        buildCategoryFormFieldChangeEvent({ checked: true })
      );
    });

    expect(result.current.values).toEqual({
      ...VALID_CATEGORY_BEHAVIOR_FORM_VALUES,
      guideOnly: true,
    });
  });

  it("clears the duration error when the duration is edited", () => {
    const { result } = renderFields();

    act(() => {
      result.current.showValidationErrors({
        defaultDurationMinutes:
          CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
      });
    });
    act(() => {
      result.current.onDefaultDurationMinutesChange(
        buildCategoryFormFieldChangeEvent({
          value: FAKE_EDITED_DURATION,
        })
      );
    });

    expect(
      result.current.values.defaultDurationMinutes
    ).toBe(FAKE_EDITED_DURATION);
    expect(result.current.errors).toEqual({});
  });

  it("clears the duration error when reservable is toggled", () => {
    const { result } = renderFields();

    act(() => {
      result.current.showValidationErrors({
        defaultDurationMinutes:
          CATEGORY_CATALOG_COPY.DEFAULT_DURATION_MINUTES_REQUIRED_WHEN_RESERVABLE_ERROR,
      });
    });
    act(() => {
      result.current.onIsReservableChange(
        buildCategoryFormFieldChangeEvent({
          checked: false,
        })
      );
    });

    expect(result.current.values.isReservable).toBe(false);
    expect(result.current.errors).toEqual({});
  });
});
