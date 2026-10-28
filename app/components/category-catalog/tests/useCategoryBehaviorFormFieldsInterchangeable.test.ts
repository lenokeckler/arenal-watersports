import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { useCategoryBehaviorFormFields } from "../hooks/useCategoryBehaviorFormFields";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";

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

describe("useCategoryBehaviorFormFields interchangeable units", () => {
  it("enables the interchangeable flag only for by_unit categories", () => {
    const byUnit = renderFields();
    const byQuantity = renderFields({
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    });

    expect(
      byUnit.result.current.availability
        .isUnitsAreInterchangeableEnabled
    ).toBe(true);
    expect(
      byQuantity.result.current.availability
        .isUnitsAreInterchangeableEnabled
    ).toBe(false);
  });

  it("ignores unticking interchangeable on a by_quantity category", () => {
    const { result } = renderFields({
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    });

    act(() => {
      result.current.onUnitsAreInterchangeableChange(
        buildCategoryFormFieldChangeEvent({
          checked: false,
        })
      );
    });

    expect(
      result.current.values.unitsAreInterchangeable
    ).toBe(true);
  });

  it("starts a by_quantity category stored as not interchangeable with the flag on", () => {
    const { result } = renderFields({
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
      unitsAreInterchangeable: false,
    });

    expect(
      result.current.values.unitsAreInterchangeable
    ).toBe(true);
  });

  it("unticks interchangeable on a by_unit category", () => {
    const { result } = renderFields();

    act(() => {
      result.current.onUnitsAreInterchangeableChange(
        buildCategoryFormFieldChangeEvent({
          checked: false,
        })
      );
    });

    expect(
      result.current.values.unitsAreInterchangeable
    ).toBe(false);
  });
});
