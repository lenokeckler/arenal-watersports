import { describe, expect, it } from "vitest";
import { isValidCustomComboPricingDuration } from "../utils/isValidCustomComboPricingDuration";
import {
  MAX_VALID_PRICING_DURATION_HOURS,
  OVERFLOW_PRICING_DURATION_HOURS,
} from "./isValidCustomComboPricingDuration.constants";

describe("isValidCustomComboPricingDuration", () => {
  it("accepts the maximum duration representable by the pricing RPC", () => {
    expect(
      isValidCustomComboPricingDuration(
        MAX_VALID_PRICING_DURATION_HOURS
      )
    ).toBe(true);
  });

  it("rejects a duration above the RPC integer bound", () => {
    expect(
      isValidCustomComboPricingDuration(
        OVERFLOW_PRICING_DURATION_HOURS
      )
    ).toBe(false);
  });
});
