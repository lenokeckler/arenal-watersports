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

describe("useCustomComboForm unit draft", () => {
  it("replaces a concrete unit in its category and removes the commitment", () => {
    const { result } = renderHook(() =>
      useCustomComboForm({
        categories: CUSTOM_COMBO_FORM_TEST.CATEGORIES,
        clearFieldError: vi.fn(),
        durationHours:
          CUSTOM_COMBO_FORM_TEST.INITIAL_DURATION_HOURS,
        onGuideIdsChange: vi.fn(),
        reservationType: RESERVATION_TYPE.COMBO,
      })
    );
    act(() => {
      result.current.handleItemChange(
        CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION
      );
      result.current.handleItemChange(
        CUSTOM_COMBO_FORM_TEST.GUIDE_UNIT_SELECTION
      );
      result.current.handleItemChange({
        ...CUSTOM_COMBO_FORM_TEST.GUIDE_UNIT_SELECTION,
        unitId: CUSTOM_COMBO_FORM_TEST.SECOND_GUIDE_UNIT_ID,
      });
    });
    expect(result.current.draft.items).toEqual([
      CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
      {
        ...CUSTOM_COMBO_FORM_TEST.GUIDE_UNIT_SELECTION,
        unitId: CUSTOM_COMBO_FORM_TEST.SECOND_GUIDE_UNIT_ID,
      },
    ]);
    act(() =>
      result.current.handleItemRemoval(
        CUSTOM_COMBO_FORM_TEST.GUIDE_CATEGORY_ID
      )
    );
    expect(result.current.draft.items).toEqual([
      CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
    ]);
  });
});
