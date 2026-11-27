import { describe, expect, it } from "vitest";
import { CURRENCY_CODE } from "@/app/constants";
import { buildReservationDepositCommand } from "../utils/buildReservationDepositCommand";
import { DEPOSIT_RESERVATION_ID } from "./ReservationDeposit.constants";
import {
  DECLINED_DEPOSIT_INPUT,
  RECEIVED_DEPOSIT_INPUT,
} from "./ReservationDepositValues.constants";

describe("buildReservationDepositCommand", () => {
  it("parses the amount of a received deposit", () => {
    expect(
      buildReservationDepositCommand(RECEIVED_DEPOSIT_INPUT)
    ).toEqual({
      amount: 200,
      currency: CURRENCY_CODE.USD,
      hasDeposit: true,
      reservationId: DEPOSIT_RESERVATION_ID,
    });
  });

  it("reads a padded comma decimal", () => {
    expect(
      buildReservationDepositCommand({
        ...RECEIVED_DEPOSIT_INPUT,
        amountText: " 20,5 ",
      })
    ).toMatchObject({ amount: 20.5 });
  });

  it("sends neither amount nor currency when there was no deposit", () => {
    expect(
      buildReservationDepositCommand(DECLINED_DEPOSIT_INPUT)
    ).toEqual({
      hasDeposit: false,
      reservationId: DEPOSIT_RESERVATION_ID,
    });
  });
});
