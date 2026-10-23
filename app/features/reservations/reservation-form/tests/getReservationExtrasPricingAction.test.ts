import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { getReservationExtrasPricingAction } from "../actions/getReservationExtrasPricingAction";
import { RESERVATION_EXTRAS_PRICING_COPY } from "../constants/ReservationExtrasPricingCopy.constants";
import { getReservationExtrasPricing } from "../services/getReservationExtrasPricing";
import { RESERVATION_EXTRAS_PRICING_INPUT_TEST } from "./isReservationExtrasPricingInput.constants";

vi.mock("../services/getReservationExtrasPricing", () => ({
  getReservationExtrasPricing: vi.fn(),
}));

describe("getReservationExtrasPricingAction", () => {
  beforeEach(() => vi.clearAllMocks());

  it("rejects malformed input before accessing the pricing service", async () => {
    await expect(
      getReservationExtrasPricingAction(
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.DUPLICATE_EXTRA_IDS
      )
    ).resolves.toEqual({
      message:
        RESERVATION_EXTRAS_PRICING_COPY.INVALID_INPUT,
      ok: false,
    });
    expect(
      getReservationExtrasPricing
    ).not.toHaveBeenCalled();
  });

  it("returns the trusted database quote for a valid request", async () => {
    vi.mocked(
      getReservationExtrasPricing
    ).mockResolvedValue(
      RESERVATION_EXTRAS_PRICING_INPUT_TEST.PRICING
    );
    await expect(
      getReservationExtrasPricingAction(
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
      )
    ).resolves.toEqual({
      ok: true,
      pricing:
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.PRICING,
    });
    expect(
      getReservationExtrasPricing
    ).toHaveBeenCalledWith(
      RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
    );
  });

  it("propagates authorization or database failures", async () => {
    const failure = new Error(
      "Pricing authorization failed"
    );
    vi.mocked(
      getReservationExtrasPricing
    ).mockRejectedValue(failure);
    await expect(
      getReservationExtrasPricingAction(
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
      )
    ).rejects.toBe(failure);
  });
});
