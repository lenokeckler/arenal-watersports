import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { resolveReservationChargeAmountError } from "../utils/resolveReservationChargeAmountError";
import { resolveReservationChargeAmountText } from "../utils/resolveReservationChargeAmountText";
import {
  BOTH_PROPOSAL,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";
import {
  CRC_PROPOSAL_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";

describe("resolveReservationChargeAmountText", () => {
  it.each([
    {
      currency: CURRENCY_CODE.USD,
      expected: USD_PROPOSAL_TEXT,
      proposal: BOTH_PROPOSAL,
    },
    {
      currency: CURRENCY_CODE.CRC,
      expected: CRC_PROPOSAL_TEXT,
      proposal: BOTH_PROPOSAL,
    },
    {
      currency: CURRENCY_CODE.CRC,
      expected: STRING.Empty,
      proposal: MIXED_PROPOSAL,
    },
  ])(
    "returns the proposal text for $currency",
    ({ currency, expected, proposal }) => {
      expect(
        resolveReservationChargeAmountText(
          proposal,
          currency
        )
      ).toBe(expected);
    }
  );
});

describe("resolveReservationChargeAmountText prefill", () => {
  it.each([
    { amount: 40, expected: "40" },
    { amount: 40.5, expected: "40.5" },
    { amount: 33.33, expected: "33.33" },
    { amount: 20000, expected: "20000" },
    { amount: 0.1, expected: "0.1" },
  ])(
    "writes $amount as plain text the validator accepts",
    ({ amount, expected }) => {
      const text = resolveReservationChargeAmountText(
        { CRC: null, USD: amount },
        CURRENCY_CODE.USD
      );

      expect(text).toBe(expected);
      expect(
        resolveReservationChargeAmountError(
          text,
          CURRENCY_CODE.USD
        )
      ).toBeUndefined();
    }
  );

  it("accepts the largest CRC proposal the database allows", () => {
    const text = resolveReservationChargeAmountText(
      { CRC: 999999999999.99, USD: null },
      CURRENCY_CODE.CRC
    );

    expect(
      resolveReservationChargeAmountError(
        text,
        CURRENCY_CODE.CRC
      )
    ).toBeUndefined();
  });
});
