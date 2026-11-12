import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import {
  BOTH_PROPOSAL,
  EMPTY_PROPOSAL,
  EXPECTED_SCHEDULED,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";

export const BOTH_CHARGE: ReservationCharge =
  EXPECTED_SCHEDULED;

export const MIXED_CHARGE: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  proposal: MIXED_PROPOSAL,
};

export const EMPTY_CHARGE: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  proposal: EMPTY_PROPOSAL,
};

export const CRC_ONLY_PROPOSAL: ReservationChargeProposal =
  {
    CRC: 20000,
    USD: null,
  };

export const EDITED_AMOUNT_TEXT = "37.5";
export const EDITED_METHOD_TEXT = "SINPE";

export const USD_PROPOSAL_TEXT = String(BOTH_PROPOSAL.USD);
export const CRC_PROPOSAL_TEXT = String(BOTH_PROPOSAL.CRC);
export const MIXED_USD_PROPOSAL_TEXT = String(
  MIXED_PROPOSAL.USD
);

export const NETWORK_FAILURE = new Error(
  "Network request failed"
);
