import { describe, expect, it } from "vitest";
import {
  CURRENCY_CODE,
  RESERVATION_DEPOSIT_DECISION_KIND,
} from "@/app/constants";
import { RESERVATION_DEPOSIT_NO_PROPOSAL } from "../constants/ReservationDepositDefaults.constants";
import { mapReservationDeposit } from "../utils/mapReservationDeposit";
import { mapReservationDepositProposal } from "../utils/mapReservationDepositProposal";
import {
  BEFORE_COSTA_RICA_MIDNIGHT_ROW,
  BOTH_PROPOSAL,
  DECLINED_ROW,
  RECEIVED_ROW,
  SPLIT_CHILD_ROW,
  SPLIT_PARENT_ID,
  UNDECIDED_DEPOSIT,
  UNDECIDED_ROW,
} from "./ReservationDeposit.constants";

const { DECLINED, RECEIVED } =
  RESERVATION_DEPOSIT_DECISION_KIND;

describe("mapReservationDeposit", () => {
  it("maps an undecided reservation with its proposal", () => {
    expect(
      mapReservationDeposit(UNDECIDED_ROW, BOTH_PROPOSAL)
    ).toEqual(UNDECIDED_DEPOSIT);
  });

  it("reads a received deposit as the decision", () => {
    expect(
      mapReservationDeposit(RECEIVED_ROW, BOTH_PROPOSAL)
        .decision
    ).toEqual({
      amount: 200,
      currency: CURRENCY_CODE.USD,
      kind: RECEIVED,
    });
  });

  it("reads the no deposit mark as the decision", () => {
    expect(
      mapReservationDeposit(DECLINED_ROW, BOTH_PROPOSAL)
        .decision
    ).toEqual({ kind: DECLINED });
  });

  it("keeps the parent of a split child", () => {
    expect(
      mapReservationDeposit(SPLIT_CHILD_ROW, BOTH_PROPOSAL)
        .parentReservationId
    ).toBe(SPLIT_PARENT_ID);
  });

  it("dates the reservation in Costa Rica time across UTC midnight", () => {
    expect(
      mapReservationDeposit(
        BEFORE_COSTA_RICA_MIDNIGHT_ROW,
        BOTH_PROPOSAL
      )
    ).toMatchObject({ date: "2026-11-02", time: "21:30" });
  });
});

describe("mapReservationDepositProposal", () => {
  it("reads both currencies from the first row", () => {
    expect(
      mapReservationDepositProposal([
        { proposal_crc: 100000, proposal_usd: 200 },
      ])
    ).toEqual(BOTH_PROPOSAL);
  });

  it.each([
    ["no rows", []],
    ["a null result", null],
  ])("proposes zero for %s", (_, rows) => {
    expect(mapReservationDepositProposal(rows)).toEqual(
      RESERVATION_DEPOSIT_NO_PROPOSAL
    );
  });
});
