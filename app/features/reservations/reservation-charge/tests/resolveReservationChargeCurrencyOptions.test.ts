import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { resolveReservationChargeCurrencyOptions } from "../utils/resolveReservationChargeCurrencyOptions";
import {
  BOTH_PROPOSAL,
  EMPTY_PROPOSAL,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";
import { CRC_ONLY_PROPOSAL } from "./ReservationChargeForm.constants";

describe("resolveReservationChargeCurrencyOptions", () => {
  it.each([
    {
      expected: [CURRENCY_CODE.USD, CURRENCY_CODE.CRC],
      name: "both currencies have a proposal",
      proposal: BOTH_PROPOSAL,
    },
    {
      expected: [CURRENCY_CODE.USD],
      name: "only USD has a proposal",
      proposal: MIXED_PROPOSAL,
    },
    {
      expected: [CURRENCY_CODE.CRC],
      name: "only CRC has a proposal",
      proposal: CRC_ONLY_PROPOSAL,
    },
    {
      expected: [CURRENCY_CODE.USD, CURRENCY_CODE.CRC],
      name: "no currency has a proposal",
      proposal: EMPTY_PROPOSAL,
    },
  ])(
    "lists the right currencies when $name",
    ({ expected, proposal }) => {
      expect(
        resolveReservationChargeCurrencyOptions(proposal)
      ).toEqual(expected);
    }
  );
});
