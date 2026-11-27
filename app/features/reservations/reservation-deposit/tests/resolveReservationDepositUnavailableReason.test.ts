import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  RESERVATION_DEPOSIT_DECISION_KIND,
  RESERVATION_STATUS,
} from "@/app/constants";
import { RESERVATION_DEPOSIT_UNAVAILABLE_REASON as REASON } from "../constants/ReservationDepositUnavailableReason.constants";
import { resolveReservationDepositUnavailableReason } from "../utils/resolveReservationDepositUnavailableReason";
import {
  SPLIT_PARENT_ID,
  UNDECIDED_DEPOSIT,
} from "./ReservationDeposit.constants";

const RECEIVED = {
  amount: 200,
  currency: CURRENCY_CODE.USD,
  kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
} as const;

describe("resolveReservationDepositUnavailableReason", () => {
  it.each([
    RESERVATION_STATUS.SCHEDULED,
    RESERVATION_STATUS.DISPATCHED,
  ])(
    "lets an undecided %s reservation record",
    (status) => {
      expect(
        resolveReservationDepositUnavailableReason({
          ...UNDECIDED_DEPOSIT,
          status,
        })
      ).toBeNull();
    }
  );

  it.each([
    RESERVATION_STATUS.CLOSED,
    RESERVATION_STATUS.CANCELLED,
  ])("refuses a %s reservation", (status) => {
    expect(
      resolveReservationDepositUnavailableReason({
        ...UNDECIDED_DEPOSIT,
        status,
      })
    ).toBe(REASON.NOT_DEPOSITABLE);
  });

  it.each([
    ["a received deposit", RECEIVED],
    [
      "the no deposit answer",
      { kind: RESERVATION_DEPOSIT_DECISION_KIND.DECLINED },
    ],
  ] as const)(
    "refuses %s already recorded",
    (_, decision) => {
      expect(
        resolveReservationDepositUnavailableReason({
          ...UNDECIDED_DEPOSIT,
          decision,
          status: RESERVATION_STATUS.CLOSED,
        })
      ).toBe(REASON.ALREADY_DECIDED);
    }
  );

  it("names the split before anything else", () => {
    expect(
      resolveReservationDepositUnavailableReason({
        ...UNDECIDED_DEPOSIT,
        decision: RECEIVED,
        parentReservationId: SPLIT_PARENT_ID,
      })
    ).toBe(REASON.SPLIT_CHILD);
  });
});
