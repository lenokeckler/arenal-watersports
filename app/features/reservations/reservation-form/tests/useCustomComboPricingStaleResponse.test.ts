import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getCustomComboPricingAction } from "../actions/getCustomComboPricingAction";
import { useCustomComboPricing } from "../hooks/useCustomComboPricing";
import type { CustomComboPricingActionResult } from "../models/CustomComboPricingActionResult.type";
import { CUSTOM_COMBO_PRICING_TEST } from "./useCustomComboPricing.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn(),
}));

const prepareStaleAndFreshPricing = () => {
  let resolveStalePricing = (
    _result: CustomComboPricingActionResult
  ): void => undefined;
  vi.mocked(getCustomComboPricingAction)
    .mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveStalePricing = resolve;
        })
    )
    .mockResolvedValueOnce({
      ok: true,
      pricing: CUSTOM_COMBO_PRICING_TEST.PRICING,
    });
  return resolveStalePricing;
};

const renderEnabledPricing = () =>
  renderHook(
    ({ isEnabled }) =>
      useCustomComboPricing(
        CUSTOM_COMBO_PRICING_TEST.FIRST_INPUT,
        isEnabled
      ),
    { initialProps: { isEnabled: true } }
  );

describe("useCustomComboPricing stale responses", () => {
  beforeEach(() => vi.clearAllMocks());

  it("ignores a pending response from before pricing was disabled", async () => {
    const resolveStalePricing =
      prepareStaleAndFreshPricing();
    const { result, rerender } = renderEnabledPricing();
    rerender({ isEnabled: false });
    rerender({ isEnabled: true });
    await waitFor(() =>
      expect(
        getCustomComboPricingAction
      ).toHaveBeenCalledTimes(2)
    );

    act(() =>
      resolveStalePricing({
        ok: true,
        pricing: CUSTOM_COMBO_PRICING_TEST.STALE_PRICING,
      })
    );
    await waitFor(() =>
      expect(result.current.state.pricing).toEqual(
        CUSTOM_COMBO_PRICING_TEST.PRICING
      )
    );
  });
});
