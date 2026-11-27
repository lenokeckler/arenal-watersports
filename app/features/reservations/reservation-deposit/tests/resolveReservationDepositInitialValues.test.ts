import { describe, expect, it } from "vitest";
import { CURRENCY_CODE, STRING } from "@/app/constants";
import { resolveReservationDepositAmountText } from "../utils/resolveReservationDepositAmountText";
import { resolveReservationDepositInitialValues } from "../utils/resolveReservationDepositInitialValues";
import {
  BOTH_PROPOSAL,
  CRC_ONLY_PROPOSAL,
  EMPTY_PROPOSAL,
} from "./ReservationDeposit.constants";
import {
  CRC_PROPOSAL_TEXT,
  USD_PROPOSAL_TEXT,
} from "./ReservationDepositValues.constants";

describe("resolveReservationDepositInitialValues", () => {
  it("proposes the dollars amount first when there is one", () => {
    expect(
      resolveReservationDepositInitialValues(BOTH_PROPOSAL)
    ).toEqual({
      amountText: USD_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.USD,
      hasDeposit: true,
    });
  });

  it("proposes colones when only colones have an amount", () => {
    expect(
      resolveReservationDepositInitialValues(
        CRC_ONLY_PROPOSAL
      )
    ).toEqual({
      amountText: CRC_PROPOSAL_TEXT,
      currency: CURRENCY_CODE.CRC,
      hasDeposit: true,
    });
  });

  it("starts on no deposit, in dollars and empty, without a proposal", () => {
    expect(
      resolveReservationDepositInitialValues(EMPTY_PROPOSAL)
    ).toEqual({
      amountText: STRING.Empty,
      currency: CURRENCY_CODE.USD,
      hasDeposit: false,
    });
  });
});

describe("resolveReservationDepositAmountText", () => {
  it("writes the proposal of a currency and leaves zero empty", () => {
    expect(
      resolveReservationDepositAmountText(
        CRC_ONLY_PROPOSAL,
        CURRENCY_CODE.CRC
      )
    ).toBe(CRC_PROPOSAL_TEXT);
    expect(
      resolveReservationDepositAmountText(
        CRC_ONLY_PROPOSAL,
        CURRENCY_CODE.USD
      )
    ).toBe(STRING.Empty);
  });
});
