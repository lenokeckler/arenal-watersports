import { CURRENCY_CODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_CHARGE_NO_PROPOSAL } from "../constants/ReservationChargeNoProposal.constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeProposalRow } from "../models/ReservationChargeProposalRow.interface";

export const mapReservationChargeProposal = (
  rows: NullableRef<readonly ReservationChargeProposalRow[]>
): ReservationChargeProposal => {
  const row = rows?.[0];

  if (row === undefined) {
    return RESERVATION_CHARGE_NO_PROPOSAL;
  }

  return {
    [CURRENCY_CODE.CRC]: row.proposal_crc,
    [CURRENCY_CODE.USD]: row.proposal_usd,
  };
};
