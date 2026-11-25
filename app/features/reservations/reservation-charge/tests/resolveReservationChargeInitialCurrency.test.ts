import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { resolveReservationChargeInitialCurrency } from "../utils/resolveReservationChargeInitialCurrency";
import {
  BOTH_PROPOSAL,
  EMPTY_PROPOSAL,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";
import { CRC_ONLY_PROPOSAL } from "./ReservationChargeForm.constants";

describe("resolveReservationChargeInitialCurrency", () => {
  it.each([
    {
      expected: CURRENCY_CODE.USD,
      name: "both currencies have a proposal",
      proposal: BOTH_PROPOSAL,
    },
    {
      expected: CURRENCY_CODE.USD,
      name: "only USD has a proposal",
      proposal: MIXED_PROPOSAL,
    },
    {
      expected: CURRENCY_CODE.CRC,
      name: "only CRC has a proposal",
      proposal: CRC_ONLY_PROPOSAL,
    },
    {
      expected: CURRENCY_CODE.USD,
      name: "no currency has a proposal",
      proposal: EMPTY_PROPOSAL,
    },
  ])(
    "starts on $expected when $name",
    ({ expected, proposal }) => {
      expect(
        resolveReservationChargeInitialCurrency(proposal)
      ).toBe(expected);
    }
  );
});
