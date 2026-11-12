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
import type { ReservationExtrasPricingActionResult } from "../models/ReservationExtrasPricingActionResult.type";
import type { ReservationExtrasViewModelInput } from "../models/ReservationExtrasViewModelInput.interface";
import {
  createDeferred,
  RESERVATION_EXTRAS_PRICING_TEST,
} from "./useReservationExtrasPricing.constants";

vi.mock(
  "../actions/getReservationExtrasPricingAction",
  () => ({
    getReservationExtrasPricingAction: vi.fn(),
  })
);

describe("useReservationExtrasPricing request freshness", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("reportError", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("ignores a stale quote after its request input changes", async () => {
    const stalePricing =
      createDeferred<ReservationExtrasPricingActionResult>();
    vi.mocked(getReservationExtrasPricingAction)
      .mockReturnValueOnce(stalePricing.promise)
      .mockResolvedValueOnce({
        ok: true,
        pricing:
          RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING,
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
    rerender({
      input: RESERVATION_EXTRAS_PRICING_TEST.SECOND_INPUT,
    });
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING
      )
    );
    await act(async () => {
      stalePricing.resolve({
        ok: true,
        pricing: RESERVATION_EXTRAS_PRICING_TEST.PRICING,
      });
      await stalePricing.promise;
    });
    expect(result.current.pricing).toEqual(
      RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING
    );
  });

  it("ignores a stale rejected request after a newer quote succeeds", async () => {
    const stalePricing =
      createDeferred<ReservationExtrasPricingActionResult>();
    vi.mocked(getReservationExtrasPricingAction)
      .mockReturnValueOnce(stalePricing.promise)
      .mockResolvedValueOnce({
        ok: true,
        pricing:
          RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING,
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
    rerender({
      input: RESERVATION_EXTRAS_PRICING_TEST.SECOND_INPUT,
    });
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING
      )
    );
    await act(async () => {
      stalePricing.reject(
        RESERVATION_EXTRAS_PRICING_TEST.ERROR
      );
      await stalePricing.promise.catch(() => undefined);
    });
    expect(result.current.pricing).toEqual(
      RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING
    );
    expect(result.current.pricingError).toBeNull();
    expect(window.reportError).not.toHaveBeenCalled();
  });
});
