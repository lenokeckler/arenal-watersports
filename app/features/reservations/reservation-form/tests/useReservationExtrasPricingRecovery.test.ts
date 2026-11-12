import {
  act,
  renderHook,
  waitFor,
} from "@testing-library/react";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationExtrasPricingAction } from "../actions/getReservationExtrasPricingAction";
import { useReservationExtrasPricing } from "../hooks/useReservationExtrasPricing";
import type { ReservationExtrasViewModelInput } from "../models/ReservationExtrasViewModelInput.interface";
import { RESERVATION_EXTRAS_PRICING_TEST } from "./useReservationExtrasPricing.constants";

vi.mock(
  "../actions/getReservationExtrasPricingAction",
  () => ({
    getReservationExtrasPricingAction: vi.fn(),
  })
);

describe("useReservationExtrasPricing recovery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("reportError", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("clears an error after revisiting the input and receiving a quote", async () => {
    vi.mocked(getReservationExtrasPricingAction)
      .mockResolvedValueOnce(
        RESERVATION_EXTRAS_PRICING_TEST.FAILURE
      )
      .mockResolvedValueOnce({
        ok: true,
        pricing:
          RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING,
      })
      .mockResolvedValueOnce({
        ok: true,
        pricing: RESERVATION_EXTRAS_PRICING_TEST.PRICING,
      });
    const { result, rerender } = renderHook(
      ({
        input,
      }: {
        input: ReservationExtrasViewModelInput;
      }) => useReservationExtrasPricing(input),
      {
        initialProps: {
          input:
            RESERVATION_EXTRAS_PRICING_TEST.FIRST_INPUT,
        },
      }
    );
    await waitFor(() =>
      expect(result.current.pricingError).toBe(
        RESERVATION_EXTRAS_PRICING_TEST.FAILURE.message
      )
    );
    rerender({
      input: RESERVATION_EXTRAS_PRICING_TEST.SECOND_INPUT,
    });
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING
      )
    );
    rerender({
      input: RESERVATION_EXTRAS_PRICING_TEST.FIRST_INPUT,
    });
    expect(result.current.pricing).toBeNull();
    expect(result.current.isPricingLoading).toBe(true);
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.PRICING
      )
    );
    expect(result.current.pricingError).toBeNull();
  });

  it("retries a failed quote", async () => {
    vi.mocked(getReservationExtrasPricingAction)
      .mockResolvedValueOnce(
        RESERVATION_EXTRAS_PRICING_TEST.FAILURE
      )
      .mockResolvedValueOnce({
        ok: true,
        pricing: RESERVATION_EXTRAS_PRICING_TEST.PRICING,
      });
    const { result } = renderHook(() =>
      useReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_TEST.FIRST_INPUT
      )
    );
    await waitFor(() =>
      expect(result.current.pricingError).toBe(
        RESERVATION_EXTRAS_PRICING_TEST.FAILURE.message
      )
    );
    act(() => result.current.retryPricing());
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.PRICING
      )
    );
    expect(result.current.pricingError).toBeNull();
  });

  it("recovers from a rejected quote request after retry", async () => {
    vi.mocked(getReservationExtrasPricingAction)
      .mockRejectedValueOnce(
        RESERVATION_EXTRAS_PRICING_TEST.ERROR
      )
      .mockResolvedValueOnce({
        ok: true,
        pricing: RESERVATION_EXTRAS_PRICING_TEST.PRICING,
      });
    const { result } = renderHook(() =>
      useReservationExtrasPricing(
        RESERVATION_EXTRAS_PRICING_TEST.FIRST_INPUT
      )
    );
    await waitFor(() =>
      expect(result.current.pricingError).not.toBeNull()
    );
    expect(window.reportError).toHaveBeenCalledWith(
      RESERVATION_EXTRAS_PRICING_TEST.ERROR
    );
    act(() => result.current.retryPricing());
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.PRICING
      )
    );
    expect(result.current.pricingError).toBeNull();
  });
});
