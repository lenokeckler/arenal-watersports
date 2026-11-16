import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { RESERVATION_CHARGE_PAYMENT_CHOICE } from "../constants/ReservationChargePaymentChoice.constants";
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
          otherPaymentMethod: EDITED_METHOD_TEXT,
          paymentChoice:
            RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER,
          secondAmountText: null,
        },
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      )
    ).toEqual({
      amountText: CRC_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.CRC,
      otherPaymentMethod: EDITED_METHOD_TEXT,
      paymentChoice:
        RESERVATION_CHARGE_PAYMENT_CHOICE.OTHER,
      secondAmountText: null,
    });
  });

  it("fills an empty amount with the new currency proposal", () => {
    expect(
      resolveReservationChargeCurrencySwitch(
        {
          amountText: STRING.Empty,
          currency: CURRENCY_CODE.USD,
          otherPaymentMethod: STRING.Empty,
          paymentChoice: null,
          secondAmountText: null,
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
          otherPaymentMethod: STRING.Empty,
          paymentChoice: null,
          secondAmountText: null,
        },
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      )
    ).toEqual({
      amountText: EDITED_AMOUNT_TEXT,
      currency: CURRENCY_CODE.CRC,
      otherPaymentMethod: STRING.Empty,
      paymentChoice: null,
      secondAmountText: null,
    });
  });
});
