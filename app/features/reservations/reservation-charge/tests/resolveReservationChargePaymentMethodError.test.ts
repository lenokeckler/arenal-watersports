import { describe, expect, it } from "vitest";
import { RESERVATION_CHARGE_LIMITS } from "../constants/ReservationChargeLimits.constants";
import { RESERVATION_CHARGE_VALIDATION_COPY as COPY } from "../constants/ReservationChargeValidationCopy.constants";
import { resolveReservationChargePaymentMethodError } from "../utils/resolveReservationChargePaymentMethodError";
import {
  BYTE_ORDER_MARK,
  MONGOLIAN_VOWEL_SEPARATOR,
  NON_BREAKING_SPACE,
  ZERO_WIDTH_SPACE,
} from "./ReservationChargeValues.constants";

const LIMIT_METHOD = "a".repeat(
  RESERVATION_CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH
);
const EMOJI_LIMIT_METHOD = "\u{1F600}".repeat(
  RESERVATION_CHARGE_LIMITS.PAYMENT_METHOD_MAX_LENGTH
);

describe("resolveReservationChargePaymentMethodError", () => {
  it.each([
    "",
    "   ",
    "\t\n",
    NON_BREAKING_SPACE,
    ` ${NON_BREAKING_SPACE}\t`,
  ])("asks for a method when it is %j", (method) => {
    expect(
      resolveReservationChargePaymentMethodError(method)
    ).toBe(COPY.METHOD_REQUIRED);
  });

  it.each([
    "tar\u0000jeta",
    "tar\njeta",
    "tar\tjeta",
    "tar\u007fjeta",
    ZERO_WIDTH_SPACE,
    MONGOLIAN_VOWEL_SEPARATOR,
    `tar${ZERO_WIDTH_SPACE}jeta`,
    `tar${BYTE_ORDER_MARK}jeta`,
  ])(
    "refuses the disallowed characters in %j",
    (method) => {
      expect(
        resolveReservationChargePaymentMethodError(method)
      ).toBe(COPY.METHOD_DISALLOWED_CHARACTERS);
    }
  );

  it.each([
    ["a method at the limit", LIMIT_METHOD],
    [
      "a padded method at the limit",
      ` \t${LIMIT_METHOD}${NON_BREAKING_SPACE}\n`,
    ],
    ["an emoji method at the limit", EMOJI_LIMIT_METHOD],
    ["a method with inner spaces", "Tarjeta de crédito"],
  ])("accepts %s", (_, method) => {
    expect(
      resolveReservationChargePaymentMethodError(method)
    ).toBeUndefined();
  });

  it("refuses an emoji method over the limit", () => {
    expect(
      resolveReservationChargePaymentMethodError(
        `${EMOJI_LIMIT_METHOD}\u{1F600}`
      )
    ).toBe(COPY.METHOD_TOO_LONG);
  });

  it("refuses a method over the limit", () => {
    expect(
      resolveReservationChargePaymentMethodError(
        `${LIMIT_METHOD}a`
      )
    ).toBe(COPY.METHOD_TOO_LONG);
  });
});
