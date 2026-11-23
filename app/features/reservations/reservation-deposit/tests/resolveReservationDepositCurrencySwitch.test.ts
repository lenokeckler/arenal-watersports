import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { resolveReservationDepositCurrencySwitch } from "../utils/resolveReservationDepositCurrencySwitch";
import {
  BOTH_PROPOSAL,
  CRC_ONLY_PROPOSAL,
} from "./ReservationDeposit.constants";
import {
  CRC_PROPOSAL_TEXT,
  EDITED_AMOUNT_TEXT,
  RECEIVED_DEPOSIT_VALUES,
} from "./ReservationDepositValues.constants";

describe("resolveReservationDepositCurrencySwitch", () => {
  it("replaces the untouched proposal with the new currency proposal", () => {
    expect(
      resolveReservationDepositCurrencySwitch(
        RECEIVED_DEPOSIT_VALUES,
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      )
    ).toEqual({
      ...RECEIVED_DEPOSIT_VALUES,
      amountText: CRC_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.CRC,
    });
  });

  it("fills an empty amount with the new currency proposal", () => {
    expect(
      resolveReservationDepositCurrencySwitch(
        {
          ...RECEIVED_DEPOSIT_VALUES,
          amountText: STRING.Empty,
        },
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      ).amountText
    ).toBe(CRC_PROPOSAL_TEXT);
  });

  it("empties the amount when the new currency has no proposal", () => {
    expect(
      resolveReservationDepositCurrencySwitch(
        {
          ...RECEIVED_DEPOSIT_VALUES,
          amountText: CRC_PROPOSAL_TEXT,
          currency: CURRENCY_CODE.CRC,
        },
        CRC_ONLY_PROPOSAL,
        CURRENCY_CODE.USD
      ).amountText
    ).toBe(STRING.Empty);
  });

  it("keeps an amount the worker edited", () => {
    expect(
      resolveReservationDepositCurrencySwitch(
        {
          ...RECEIVED_DEPOSIT_VALUES,
          amountText: EDITED_AMOUNT_TEXT,
        },
        BOTH_PROPOSAL,
        CURRENCY_CODE.CRC
      )
    ).toEqual({
      ...RECEIVED_DEPOSIT_VALUES,
      amountText: EDITED_AMOUNT_TEXT,
      currency: CURRENCY_CODE.CRC,
    });
  });
});
