import { STRING } from "@/app/constants";
import {
  RESERVATION_CHARGE_PAYMENT_CHOICE,
  RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL,
} from "../constants/ReservationChargePaymentChoice.constants";
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

export const CRC_ONLY_CHARGE: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  proposal: CRC_ONLY_PROPOSAL,
};

export const CRC_ONLY_PROPOSAL_TEXT = String(
  CRC_ONLY_PROPOSAL.CRC
);
export const CRC_ENTERED_AMOUNT_TEXT = "15000";

export const EDITED_AMOUNT_TEXT = "37.5";
export const EDITED_METHOD_TEXT =
  RESERVATION_CHARGE_PAYMENT_CHOICE_LABEL[
    RESERVATION_CHARGE_PAYMENT_CHOICE.SINPE
  ];

export const EDITED_METHOD_FIELDS = {
  otherPaymentMethod: STRING.Empty,
  paymentChoice: RESERVATION_CHARGE_PAYMENT_CHOICE.SINPE,
} as const;

export const USD_PROPOSAL_TEXT = String(BOTH_PROPOSAL.USD);
export const CRC_PROPOSAL_TEXT = String(BOTH_PROPOSAL.CRC);
export const MIXED_USD_PROPOSAL_TEXT = String(
  MIXED_PROPOSAL.USD
);

export const NETWORK_FAILURE = new Error(
  "Network request failed"
);
