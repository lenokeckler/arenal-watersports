import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { CATEGORY_TRACKING_MODE } from "../constants/CategoryTrackingMode.constants";
import { USAGE_METRIC } from "../constants/UsageMetric.constants";
import { useCategoryBehaviorFormFields } from "../hooks/useCategoryBehaviorFormFields";
import type { CategoryBehavior } from "../models/CategoryBehavior.interface";
import { buildCategoryFormFieldChangeEvent } from "./buildCategoryFormFieldChangeEvent";
import { DEFAULT_CATEGORY_BEHAVIOR } from "./CategoryBehavior.constants";
import { VALID_CATEGORY_BEHAVIOR_FORM_VALUES } from "./CategoryBehaviorFormValues.constants";

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

describe("useCategoryBehaviorFormFields", () => {
  it("seeds the values from the behavior and starts without errors", () => {
    const { result } = renderFields();

    expect(result.current.values).toEqual(
      VALID_CATEGORY_BEHAVIOR_FORM_VALUES
    );
    expect(result.current.errors).toEqual({});
  });

  it("enables condition photos only for by_unit categories", () => {
    const byUnit = renderFields();
    const byQuantity = renderFields({
      trackingMode: CATEGORY_TRACKING_MODE.BY_QUANTITY,
    });

    expect(
      byUnit.result.current.availability
        .isConditionPhotosEnabled
    ).toBe(true);
    expect(
      byQuantity.result.current.availability
        .isConditionPhotosEnabled
    ).toBe(false);
  });

  it("clears the usage metric and disables its select when the motor is switched off", () => {
    const { result } = renderFields();

    act(() => {
      result.current.onHasMotorChange(
        buildCategoryFormFieldChangeEvent({
          checked: false,
        })
      );
    });

    expect(result.current.values.usageMetric).toBe(
      STRING.Empty
    );
    expect(
      result.current.availability.isUsageMetricEnabled
    ).toBe(false);
  });

  it("changes the usage metric while the motor is on", () => {
    const { result } = renderFields();

    act(() => {
      result.current.onUsageMetricChange(
        buildCategoryFormFieldChangeEvent({
          value: USAGE_METRIC.KILOMETERS,
        })
      );
    });

    expect(result.current.values.usageMetric).toBe(
      USAGE_METRIC.KILOMETERS
    );
  });
});
