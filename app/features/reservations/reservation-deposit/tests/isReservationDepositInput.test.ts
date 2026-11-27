import { describe, expect, it } from "vitest";
import { isReservationDepositInput } from "../utils/isReservationDepositInput";
import { MALFORMED_RESERVATION_ID } from "./ReservationDeposit.constants";
import {
  DECLINED_DEPOSIT_INPUT,
  RECEIVED_DEPOSIT_INPUT,
} from "./ReservationDepositValues.constants";

describe("isReservationDepositInput", () => {
  it.each([
    ["a received deposit", RECEIVED_DEPOSIT_INPUT],
    ["a declined deposit", DECLINED_DEPOSIT_INPUT],
  ])("accepts %s", (_, input) => {
    expect(isReservationDepositInput(input)).toBe(true);
  });

  it.each([
    ["null", null],
    ["a string", "deposit"],
    [
      "a malformed id",
      {
        ...RECEIVED_DEPOSIT_INPUT,
        reservationId: MALFORMED_RESERVATION_ID,
      },
    ],
    [
      "a numeric amount",
      { ...RECEIVED_DEPOSIT_INPUT, amountText: 200 },
    ],
    [
      "an unknown currency",
      { ...RECEIVED_DEPOSIT_INPUT, currency: "EUR" },
    ],
    [
      "a text decision",
      { ...RECEIVED_DEPOSIT_INPUT, hasDeposit: "true" },
    ],
    [
      "a null decision",
      { ...RECEIVED_DEPOSIT_INPUT, hasDeposit: null },
    ],
  ])("refuses %s", (_, input) => {
    expect(isReservationDepositInput(input)).toBe(false);
  });

  it.each([
    "reservationId",
    "amountText",
    "currency",
    "hasDeposit",
  ])("refuses an input without the %s key", (key) => {
    const withoutKey: Record<string, unknown> = {
      ...RECEIVED_DEPOSIT_INPUT,
    };
    delete withoutKey[key];

    expect(isReservationDepositInput(withoutKey)).toBe(
      false
    );
  });
});
