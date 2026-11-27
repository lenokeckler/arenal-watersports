import { describe, expect, it } from "vitest";
import { STRING } from "@/app/constants";
import { isReservationExtraTimeInput } from "../utils/isReservationExtraTimeInput";
import {
  EXTRA_TIME_CHARGED_INPUT,
  EXTRA_TIME_COURTESY_INPUT,
} from "./ReservationExtraTime.constants";

describe("isReservationExtraTimeInput", () => {
  it.each([
    ["a charge", EXTRA_TIME_CHARGED_INPUT],
    ["a courtesy", EXTRA_TIME_COURTESY_INPUT],
    [
      "an undecided form",
      { ...EXTRA_TIME_CHARGED_INPUT, outcome: null },
    ],
  ])("accepts %s", (_, input) => {
    expect(isReservationExtraTimeInput(input)).toBe(true);
  });

  it.each([
    ["null", null],
    [
      "a malformed reservation id",
      { ...EXTRA_TIME_CHARGED_INPUT, reservationId: "R-1" },
    ],
    [
      "an unknown outcome",
      { ...EXTRA_TIME_CHARGED_INPUT, outcome: "waived" },
    ],
    [
      "an unknown currency",
      { ...EXTRA_TIME_CHARGED_INPUT, currency: "EUR" },
    ],
    [
      "an unknown payment choice",
      {
        ...EXTRA_TIME_CHARGED_INPUT,
        paymentChoice: "bitcoin",
      },
    ],
    [
      "a numeric amount",
      {
        ...EXTRA_TIME_CHARGED_INPUT,
        amountText: Number(STRING.Empty),
      },
    ],
    [
      "a missing other method",
      {
        ...EXTRA_TIME_CHARGED_INPUT,
        otherPaymentMethod: undefined,
      },
    ],
  ])("refuses %s", (_, input) => {
    expect(isReservationExtraTimeInput(input)).toBe(false);
  });
});
