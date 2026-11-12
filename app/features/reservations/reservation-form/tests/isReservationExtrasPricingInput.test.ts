import { describe, expect, it } from "vitest";
import { RESERVATION_EXTRAS_PRICING_INPUT_TEST } from "./isReservationExtrasPricingInput.constants";
import { isReservationExtrasPricingInput } from "../utils/isReservationExtrasPricingInput";

describe("isReservationExtrasPricingInput", () => {
  it("accepts a valid concrete boat pricing request", () => {
    expect(
      isReservationExtrasPricingInput(
        RESERVATION_EXTRAS_PRICING_INPUT_TEST.INPUT
      )
    ).toBe(true);
  });

  it.each([
    RESERVATION_EXTRAS_PRICING_INPUT_TEST.DUPLICATE_EXTRA_IDS,
    RESERVATION_EXTRAS_PRICING_INPUT_TEST.DUPLICATE_NORMALIZED_EXTRA_IDS,
    RESERVATION_EXTRAS_PRICING_INPUT_TEST.INVALID_DURATION,
    RESERVATION_EXTRAS_PRICING_INPUT_TEST.INVALID_EXTRA_ID,
    RESERVATION_EXTRAS_PRICING_INPUT_TEST.INVALID_RESERVATION_TYPE,
    RESERVATION_EXTRAS_PRICING_INPUT_TEST.INVALID_UNIT_ID,
    null,
  ])("rejects malformed pricing input", (input) => {
    expect(isReservationExtrasPricingInput(input)).toBe(
      false
    );
  });
});
