import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeProposalRow } from "../models/ReservationChargeProposalRow.interface";
import type { ReservationChargeRow } from "../models/ReservationChargeRow.interface";

export const CHARGE_RESERVATION_ID =
  "e2c20000-0000-4000-8000-000000000301";
export const CHARGE_PARENT_RESERVATION_ID =
  "e2c20000-0000-4000-8000-000000000302";
export const MALFORMED_RESERVATION_ID = "not-a-uuid";

export const BOTH_PROPOSAL_ROW: ReservationChargeProposalRow =
  {
    proposal_crc: 20000,
    proposal_usd: 40,
  };

export const BOTH_PROPOSAL: ReservationChargeProposal = {
  CRC: 20000,
  USD: 40,
};

export const MIXED_PROPOSAL_ROW: ReservationChargeProposalRow =
  {
    proposal_crc: null,
    proposal_usd: 150,
  };

export const MIXED_PROPOSAL: ReservationChargeProposal = {
  CRC: null,
  USD: 150,
};

export const EMPTY_PROPOSAL_ROW: ReservationChargeProposalRow =
  {
    proposal_crc: null,
    proposal_usd: null,
  };

export const EMPTY_PROPOSAL: ReservationChargeProposal = {
  CRC: null,
  USD: null,
};

export const SCHEDULED_ROW: ReservationChargeRow = {
  code: "R-000230",
  customer_name: "Grupo Cobrado",
  duration_minutes: 90,
  id: CHARGE_RESERVATION_ID,
  parent_reservation_id: null,
  people_count: 6,
  starts_at: "2026-11-02T20:30:00+00:00",
  status: "scheduled",
};

export const EXPECTED_SCHEDULED: ReservationCharge = {
  code: "R-000230",
  customerName: "Grupo Cobrado",
  date: "2026-11-02",
  durationMinutes: 90,
  id: CHARGE_RESERVATION_ID,
  parentReservationId: null,
  peopleCount: 6,
  proposal: BOTH_PROPOSAL,
  status: "scheduled",
  time: "14:30",
};

export const CANCELLED_ROW: ReservationChargeRow = {
  ...SCHEDULED_ROW,
  status: "cancelled",
};

export const SPLIT_CHILD_ROW: ReservationChargeRow = {
  ...SCHEDULED_ROW,
  parent_reservation_id: CHARGE_PARENT_RESERVATION_ID,
};

export const CHARGE_READ_FAILURE = {
  code: "42501",
  details: "",
  hint: "",
  message: "permission denied",
};
