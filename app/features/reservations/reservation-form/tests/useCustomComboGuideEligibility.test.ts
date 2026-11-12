import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import { useCustomComboForm } from "../hooks/useCustomComboForm";
import { CUSTOM_COMBO_FORM_TEST } from "./useCustomComboForm.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn().mockResolvedValue({
    ok: true,
    pricing: { listAmountCrc: null, listAmountUsd: null },
  }),
}));

describe("useCustomComboForm guide eligibility", () => {
  it("clears guides only after the last tour item is removed", () => {
    const changeGuides = vi.fn();
    const { result } = renderHook(() =>
      useCustomComboForm({
        categories: CUSTOM_COMBO_FORM_TEST.CATEGORIES,
        clearFieldError: vi.fn(),
        durationHours:
          CUSTOM_COMBO_FORM_TEST.INITIAL_DURATION_HOURS,
        onGuideIdsChange: changeGuides,
        reservationType: RESERVATION_TYPE.COMBO,
      })
    );
    act(() => {
      result.current.handleItemChange({
        ...CUSTOM_COMBO_FORM_TEST.GUIDE_UNIT_SELECTION,
      });
      result.current.handleItemChange({
        ...CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
        quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
      });
      result.current.handleItemRemoval(
        CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID
      );
    });
    expect(result.current.hasGuideOnlyItem).toBe(true);
    expect(changeGuides).not.toHaveBeenCalled();
    act(() =>
      result.current.handleItemRemoval(
        CUSTOM_COMBO_FORM_TEST.GUIDE_CATEGORY_ID
      )
    );
    expect(result.current.hasGuideOnlyItem).toBe(false);
    expect(changeGuides).toHaveBeenCalledWith([]);
  });
});
