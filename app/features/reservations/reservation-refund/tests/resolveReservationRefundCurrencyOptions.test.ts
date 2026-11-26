import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { resolveReservationRefundCurrencyOptions } from "../utils/resolveReservationRefundCurrencyOptions";
import {
  BOTH_REFUNDABLE,
  CRC_ONLY_REFUNDABLE,
  NOTHING_REFUNDABLE,
  USD_ONLY_REFUNDABLE,
} from "./ReservationRefundForm.constants";

describe("resolveReservationRefundCurrencyOptions", () => {
  it.each([
    {
      expected: [CURRENCY_CODE.USD, CURRENCY_CODE.CRC],
      name: "both currencies have money to refund",
      refundable: BOTH_REFUNDABLE,
    },
    {
      expected: [CURRENCY_CODE.USD],
      name: "only USD has money to refund",
      refundable: USD_ONLY_REFUNDABLE,
    },
    {
      expected: [CURRENCY_CODE.CRC],
      name: "only CRC has money to refund",
      refundable: CRC_ONLY_REFUNDABLE,
    },
    {
      expected: [CURRENCY_CODE.USD, CURRENCY_CODE.CRC],
      name: "nothing is refundable",
      refundable: NOTHING_REFUNDABLE,
    },
  ])(
    "offers the right currencies when $name",
    ({ expected, refundable }) => {
      expect(
        resolveReservationRefundCurrencyOptions(refundable)
      ).toEqual(expected);
    }
  );
});
