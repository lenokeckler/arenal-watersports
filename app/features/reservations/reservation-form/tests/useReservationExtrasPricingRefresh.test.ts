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
import type { ReservationExtrasViewModelInput } from "../models/ReservationExtrasViewModelInput.interface";
import { RESERVATION_EXTRAS_PRICING_TEST } from "./useReservationExtrasPricing.constants";

vi.mock(
  "../actions/getReservationExtrasPricingAction",
  () => ({
    getReservationExtrasPricingAction: vi.fn(),
  })
);

describe("useReservationExtrasPricing refresh", () => {
  beforeEach(() => vi.clearAllMocks());

  it("requests a new quote for type, duration, and extra changes", async () => {
    vi.mocked(getReservationExtrasPricingAction)
      .mockResolvedValueOnce({
        ok: true,
        pricing: RESERVATION_EXTRAS_PRICING_TEST.PRICING,
      })
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
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.PRICING
      )
    );
    rerender({
      input:
        RESERVATION_EXTRAS_PRICING_TEST.SAME_UNIT_TOUR_INPUT,
    });
    await waitFor(() =>
      expect(result.current.pricing).toEqual(
        RESERVATION_EXTRAS_PRICING_TEST.SECOND_PRICING
      )
    );
    expect(
      getReservationExtrasPricingAction
    ).toHaveBeenCalledTimes(2);
  });

  it.each([
    [
      "duration",
      RESERVATION_EXTRAS_PRICING_TEST.DURATION_CHANGE_INPUT,
    ],
    [
      "reservation type",
      RESERVATION_EXTRAS_PRICING_TEST.TYPE_CHANGE_INPUT,
    ],
    [
      "selected extras",
      RESERVATION_EXTRAS_PRICING_TEST.EXTRA_CHANGE_INPUT,
    ],
  ])(
    "requests a new quote when %s changes",
    async (_, changedInput) => {
      vi.mocked(
        getReservationExtrasPricingAction
      ).mockResolvedValue({
        ok: true,
        pricing: RESERVATION_EXTRAS_PRICING_TEST.PRICING,
      });
      const { rerender } = renderHook(
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
      rerender({ input: changedInput });
      await waitFor(() =>
        expect(
          getReservationExtrasPricingAction
        ).toHaveBeenCalledTimes(2)
      );
      expect(
        getReservationExtrasPricingAction
      ).toHaveBeenLastCalledWith(changedInput);
    }
  );
});
