import {
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
import { getReservationExtrasPricingAction } from "../actions/getReservationExtrasPricingAction";
import { useReservationExtrasPricing } from "../hooks/useReservationExtrasPricing";
import { RESERVATION_EXTRAS_PRICING_TEST } from "./useReservationExtrasPricing.constants";

vi.mock(
  "../actions/getReservationExtrasPricingAction",
  () => ({
    getReservationExtrasPricingAction: vi.fn(),
  })
);

describe("useReservationExtrasPricing", () => {
  beforeEach(() => vi.clearAllMocks());

  it("requests the server quote for the selected input", async () => {
    vi.mocked(
      getReservationExtrasPricingAction
    ).mockResolvedValue({
      ok: true,
      pricing: RESERVATION_EXTRAS_PRICING_TEST.PRICING,
    });
    const { result } = renderHook(() =>
      useReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_TEST.FIRST_INPUT
      )
    );
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.PRICING
      )
    );
    expect(
      getReservationExtrasPricingAction
    ).toHaveBeenCalledWith(
      RESERVATION_EXTRAS_PRICING_TEST.FIRST_INPUT
    );
  });

  it("skips quotes for invalid duration or unsupported type", () => {
    renderHook(() =>
      useReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_TEST.INVALID_DURATION_INPUT
      )
    );
    renderHook(() =>
      useReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_TEST.COMBO_INPUT
      )
    );
    expect(
      getReservationExtrasPricingAction
    ).not.toHaveBeenCalled();
  });
});
