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

describe("custom combo agreed amounts", () => {
  it("clears invalid currency input without changing the other amount", () => {
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
      result.current.handleAgreedAmountCrcChange(
        CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT_CRC_INDEPENDENT
      );
      result.current.handleAgreedAmountUsdChange(
        CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT_USD_INDEPENDENT
      );
    });
    act(() => {
      result.current.handleAgreedAmountCrcChange(
        CUSTOM_COMBO_FORM_TEST.INVALID_NON_FINITE_AMOUNT
      );
    });

    expect(result.current.draft.agreedAmountCrc).toBeNull();
    expect(result.current.draft.agreedAmountUsd).toBe(
      CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT_USD_INDEPENDENT
    );
    act(() => {
      result.current.handleAgreedAmountUsdChange(
        CUSTOM_COMBO_FORM_TEST.NEGATIVE_AGREED_AMOUNT
      );
    });
    expect(result.current.draft.agreedAmountUsd).toBeNull();
  });
});
