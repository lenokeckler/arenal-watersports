import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { resolveReservationChargeCurrencySwitch } from "../utils/resolveReservationChargeCurrencySwitch";
import { BOTH_PROPOSAL } from "./ReservationCharge.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  EDITED_METHOD_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationChargeForm.constants";

describe("resolveReservationChargeCurrencySwitch", () => {
  it("replaces the untouched proposal with the new currency proposal", () => {
    expect(
      resolveReservationChargeCurrencySwitch(
        {
          amountText: USD_PROPOSAL_TEXT,
          currency: CURRENCY_CODE.USD,
          paymentMethod: EDITED_METHOD_TEXT,
        },
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      )
    ).toEqual({
      amountText: CRC_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.CRC,
      paymentMethod: EDITED_METHOD_TEXT,
    });
  });

  it("fills an empty amount with the new currency proposal", () => {
    expect(
      resolveReservationChargeCurrencySwitch(
        {
          amountText: STRING.Empty,
          currency: CURRENCY_CODE.USD,
          paymentMethod: STRING.Empty,
        },
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      ).amountText
    ).toBe(CRC_PROPOSAL_TEXT);
  });

  it("keeps an amount the worker edited", () => {
    expect(
      resolveReservationChargeCurrencySwitch(
        {
          amountText: EDITED_AMOUNT_TEXT,
          currency: CURRENCY_CODE.USD,
          paymentMethod: STRING.Empty,
        },
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      )
    ).toEqual({
      amountText: EDITED_AMOUNT_TEXT,
      currency: CURRENCY_CODE.CRC,
      paymentMethod: STRING.Empty,
    });
  });
});
