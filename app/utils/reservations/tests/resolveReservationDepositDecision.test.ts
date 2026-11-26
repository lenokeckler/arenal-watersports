import { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import { describe, expect, it } from "vitest";
import { resolveReservationDepositDecision } from "../resolveReservationDepositDecision";
import {
  FIRST_DEPOSIT,
  SECOND_DEPOSIT,
} from "./resolveReservationDepositDecision.constants";

describe("resolveReservationDepositDecision", () => {
  it("is undecided without a deposit nor a declination", () => {
    expect(
      resolveReservationDepositDecision({
        declined: false,
        deposits: [],
      })
    ).toEqual({
      kind: RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED,
    });
  });

  it("is declined when only the declination exists", () => {
    expect(
      resolveReservationDepositDecision({
        declined: true,
        deposits: [],
      })
    ).toEqual({
      kind: RESERVATION_DEPOSIT_DECISION_KIND.DECLINED,
    });
  });

  it("is received with the amount and currency of the deposit", () => {
    expect(
      resolveReservationDepositDecision({
        declined: false,
        deposits: [FIRST_DEPOSIT],
      })
    ).toEqual({
      ...FIRST_DEPOSIT,
      kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
    });
  });

  it("keeps the first deposit when several exist", () => {
    expect(
      resolveReservationDepositDecision({
        declined: false,
        deposits: [FIRST_DEPOSIT, SECOND_DEPOSIT],
      })
    ).toEqual({
      ...FIRST_DEPOSIT,
      kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
    });
  });

  it("prefers a deposit over a declination", () => {
    expect(
      resolveReservationDepositDecision({
        declined: true,
        deposits: [FIRST_DEPOSIT],
      })
    ).toEqual({
      ...FIRST_DEPOSIT,
      kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
    });
  });
});
