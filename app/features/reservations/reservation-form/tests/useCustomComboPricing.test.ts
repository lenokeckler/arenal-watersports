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
import { CUSTOM_COMBO_PRICING_STATUS } from "../constants/CustomComboPricingStatus.constants";
import { useCustomComboPricing } from "../hooks/useCustomComboPricing";
import { CUSTOM_COMBO_PRICING_TEST } from "./useCustomComboPricing.constants";

vi.mock("../actions/getCustomComboPricingAction", () => ({
  getCustomComboPricingAction: vi.fn(),
}));

describe("useCustomComboPricing", () => {
  beforeEach(() => vi.clearAllMocks());

  it("skips empty selections and sends the exact input for a nullable quote", async () => {
    const { result, rerender } = renderHook(
      ({ input }) => useCustomComboPricing(input),
      {
        initialProps: {
          input: CUSTOM_COMBO_PRICING_TEST.EMPTY_INPUT,
        },
      }
    );
    expect(result.current.state.status).toBe(
      CUSTOM_COMBO_PRICING_STATUS.IDLE
    );
    expect(
      getCustomComboPricingAction
    ).not.toHaveBeenCalled();
    vi.mocked(getCustomComboPricingAction)
      .mockRejectedValueOnce(
        new Error(CUSTOM_COMBO_PRICING_TEST.ERROR_MESSAGE)
      )
      .mockResolvedValueOnce({
        ok: true,
        pricing: CUSTOM_COMBO_PRICING_TEST.PRICING,
      });
    rerender({
      input: CUSTOM_COMBO_PRICING_TEST.FIRST_INPUT,
    });
    await waitFor(() =>
      expect(result.current.state.status).toBe(
        CUSTOM_COMBO_PRICING_STATUS.ERROR
      )
    );
    act(() => result.current.retry());
    await waitFor(() =>
      expect(result.current.state.status).toBe(
        CUSTOM_COMBO_PRICING_STATUS.READY
      )
    );
    expect(
      getCustomComboPricingAction
    ).toHaveBeenCalledWith(
      CUSTOM_COMBO_PRICING_TEST.FIRST_INPUT
    );
    expect(result.current.state.pricing).toEqual(
      CUSTOM_COMBO_PRICING_TEST.PRICING
    );
    expect(
      getCustomComboPricingAction
    ).toHaveBeenCalledTimes(2);
  });

  it("ignores an older response after selection changes", async () => {
    let resolveFirst: (value: {
      ok: true;
      pricing: typeof CUSTOM_COMBO_PRICING_TEST.PRICING;
    }) => void = () => undefined;
    vi.mocked(getCustomComboPricingAction)
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve;
          })
      )
      .mockResolvedValueOnce({
        ok: true,
        pricing: CUSTOM_COMBO_PRICING_TEST.PRICING,
      });
    const { result, rerender } = renderHook(
      ({ input }) => useCustomComboPricing(input),
      {
        initialProps: {
          input: CUSTOM_COMBO_PRICING_TEST.FIRST_INPUT,
        },
      }
    );
    rerender({
      input: CUSTOM_COMBO_PRICING_TEST.SECOND_INPUT,
    });
    await waitFor(() =>
      expect(result.current.state.status).toBe(
        CUSTOM_COMBO_PRICING_STATUS.READY
      )
    );
    act(() =>
      resolveFirst({
        ok: true,
        pricing: CUSTOM_COMBO_PRICING_TEST.STALE_PRICING,
      })
    );
    expect(result.current.state.pricing).toEqual(
      CUSTOM_COMBO_PRICING_TEST.PRICING
    );
  });
});
