import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
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
