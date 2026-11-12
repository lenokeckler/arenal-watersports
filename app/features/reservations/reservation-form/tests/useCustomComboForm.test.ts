import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getCustomComboPricingAction } from "../actions/getCustomComboPricingAction";
import { RESERVATION_TYPE } from "../constants/ReservationType.constants";
import type { ReservationType } from "../models/ReservationType.type";
import { useCustomComboForm } from "../hooks/useCustomComboForm";
import { CUSTOM_COMBO_FORM_TEST } from "./useCustomComboForm.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn().mockResolvedValue({
    ok: true,
    pricing: { listAmountCrc: null, listAmountUsd: null },
  }),
}));

const INITIAL_RESERVATION_TYPE: ReservationType =
  RESERVATION_TYPE.RENTAL;

const renderCustomComboForm = (
  reservationType: ReservationType
) =>
  renderHook<
    ReturnType<typeof useCustomComboForm>,
    { reservationType: ReservationType }
  >(
    ({ reservationType: currentType }) =>
      useCustomComboForm({
        categories: CUSTOM_COMBO_FORM_TEST.CATEGORIES,
        clearFieldError: vi.fn(),
        durationHours:
          CUSTOM_COMBO_FORM_TEST.INITIAL_DURATION_HOURS,
        onGuideIdsChange: vi.fn(),
        reservationType: currentType,
      }),
    { initialProps: { reservationType } }
  );

const renderCustomComboFormForDuration = (
  duration: number
) =>
  renderHook(
    ({ currentDuration }) =>
      useCustomComboForm({
        categories: CUSTOM_COMBO_FORM_TEST.CATEGORIES,
        clearFieldError: vi.fn(),
        durationHours: currentDuration,
        onGuideIdsChange: vi.fn(),
        reservationType: RESERVATION_TYPE.COMBO,
      }),
    { initialProps: { currentDuration: duration } }
  );

const applyDraftChanges = (result: {
  current: ReturnType<typeof useCustomComboForm>;
}) => {
  act(() => {
    result.current.handleItemChange({
      ...CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
      quantity: CUSTOM_COMBO_FORM_TEST.VALID_QUANTITY,
    });
    result.current.handleItemChange({
      ...CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
      quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
    });
    result.current.handleItemChange({
      ...CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
      quantity: CUSTOM_COMBO_FORM_TEST.INVALID_QUANTITY,
    });
    result.current.handleAgreedAmountCrcChange(
      CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT
    );
    result.current.handleAgreedAmountUsdChange(
      CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT_USD
    );
  });
};

const expectDraftChanges = (result: {
  current: ReturnType<typeof useCustomComboForm>;
}) => {
  expect(result.current.draft.items).toEqual([
    {
      ...CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
      quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
    },
  ]);
  expect(result.current.draft.agreedAmountCrc).toBe(
    CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT
  );
  expect(result.current.draft.agreedAmountUsd).toBe(
    CUSTOM_COMBO_FORM_TEST.AGREED_AMOUNT_USD
  );
};

describe("useCustomComboForm", () => {
  it("requests prices only while the reservation type is combo", async () => {
    const { result, rerender } = renderCustomComboForm(
      INITIAL_RESERVATION_TYPE
    );
    act(() =>
      result.current.handleItemChange({
        ...CUSTOM_COMBO_FORM_TEST.REGULAR_SELECTION,
        quantity: CUSTOM_COMBO_FORM_TEST.UPDATED_QUANTITY,
      })
    );
    expect(
      getCustomComboPricingAction
    ).not.toHaveBeenCalled();

    rerender({ reservationType: RESERVATION_TYPE.COMBO });
    await waitFor(() =>
      expect(
        getCustomComboPricingAction
      ).toHaveBeenCalledTimes(1)
    );

    rerender({ reservationType: RESERVATION_TYPE.TOUR });
    expect(result.current.pricing.pricing).toBeNull();
    expect(
      getCustomComboPricingAction
    ).toHaveBeenCalledTimes(1);
  });

  it("keeps unique valid items and agreed prices across repricing", () => {
    const { result, rerender } =
      renderCustomComboFormForDuration(
        CUSTOM_COMBO_FORM_TEST.INITIAL_DURATION_HOURS
      );
    applyDraftChanges(result);
    rerender({
      currentDuration:
        CUSTOM_COMBO_FORM_TEST.UPDATED_DURATION_HOURS,
    });
    expectDraftChanges(result);
  });
});
