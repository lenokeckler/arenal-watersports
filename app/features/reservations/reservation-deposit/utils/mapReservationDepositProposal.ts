import { CURRENCY_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_DEPOSIT_NO_PROPOSAL } from "../constants/ReservationDepositDefaults.constants";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import type { ReservationDepositProposalRow } from "../models/ReservationDepositProposalRow.type";

export const mapReservationDepositProposal = (
  rows: NullableRef<
    readonly ReservationDepositProposalRow[]
  >
): ReservationDepositProposal => {
  const row = rows?.[0];

  if (row === undefined) {
    return RESERVATION_DEPOSIT_NO_PROPOSAL;
  }

  return {
    [CURRENCY_CODE.CRC]: row.proposal_crc,
    [CURRENCY_CODE.USD]: row.proposal_usd,
  };
};
