import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useCustomComboForm } from "../hooks/useCustomComboForm";
import { CUSTOM_COMBO_FORM_TEST } from "./useCustomComboForm.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn().mockResolvedValue({
    ok: true,
    pricing: { listAmountCrc: null, listAmountUsd: null },
  }),
}));

describe("useCustomComboForm", () => {
  it("keeps unique valid items and agreed prices across repricing", () => {
    const { result, rerender } = renderHook(
      ({ duration }) =>
        useCustomComboForm(
          CUSTOM_COMBO_FORM_TEST.CATEGORIES,
          duration,
          vi.fn(),
          vi.fn()
        ),
      {
        initialProps: {
          duration:
            CUSTOM_COMBO_FORM_TEST.INITIAL_DURATION_HOURS,
        },
      }
    );
    act(() => {
      result.current.handleItemChange({
        categoryId:
          CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
        quantity: CUSTOM_COMBO_FORM_TEST.VALID_QUANTITY,
      });
      result.current.handleItemChange({
        categoryId:
          CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
        quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
      });
      result.current.handleItemChange({
        categoryId:
          CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
        quantity: CUSTOM_COMBO_FORM_TEST.INVALID_QUANTITY,
      });
      result.current.handleAgreedAmountCrcChange(
        CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT
      );
      result.current.handleAgreedAmountUsdChange(
        CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT_USD
      );
    });
    rerender({
      duration:
        CUSTOM_COMBO_FORM_TEST.UPDATED_DURATION_HOURS,
    });
    expect(result.current.draft.items).toEqual([
      {
        categoryId:
          CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
        quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
      },
    ]);
    expect(result.current.draft.agreedAmountCrc).toBe(
      CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT
    );
    expect(result.current.draft.agreedAmountUsd).toBe(
      CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT_USD
    );
  });

  it("clears guides only after the last tour item is removed", () => {
    const changeGuides = vi.fn();
    const { result } = renderHook(() =>
      useCustomComboForm(
        CUSTOM_COMBO_FORM_TEST.CATEGORIES,
        CUSTOM_COMBO_FORM_TEST.INITIAL_DURATION_HOURS,
        changeGuides,
        vi.fn()
      )
    );
    act(() => {
      result.current.handleItemChange({
        categoryId:
          CUSTOM_COMBO_FORM_TEST.GUIDE_CATEGORY_ID,
        quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
      });
    });
    act(() => {
      result.current.handleItemChange({
        categoryId:
          CUSTOM_COMBO_FORM_TEST.REGULAR_CATEGORY_ID,
        quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
      });
    });
    act(() => {
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
