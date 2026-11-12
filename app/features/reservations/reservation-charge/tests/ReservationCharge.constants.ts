import { RESERVATION_STATUS } from "@/app/constants";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeProposalRow } from "../models/ReservationChargeProposalRow.interface";
import type { ReservationChargeRow } from "../models/ReservationChargeRow.type";

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
  status: RESERVATION_STATUS.SCHEDULED,
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
  status: RESERVATION_STATUS.SCHEDULED,
  time: "14:30",
};

export const CANCELLED_ROW: ReservationChargeRow = {
  ...SCHEDULED_ROW,
  status: RESERVATION_STATUS.CANCELLED,
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

export const EMPTY_RESERVATION_ID = "";
export const UPPERCASE_RESERVATION_ID =
  CHARGE_RESERVATION_ID.toUpperCase();
export const TRAILING_NEWLINE_RESERVATION_ID =
  CHARGE_RESERVATION_ID + String.fromCharCode(10);

export const LAST_MINUTE_OF_COSTA_RICA_DAY_ROW: ReservationChargeRow =
  {
    ...SCHEDULED_ROW,
    starts_at: "2026-11-03T05:59:00+00:00",
  };

export const FIRST_MINUTE_OF_COSTA_RICA_DAY_ROW: ReservationChargeRow =
  {
    ...SCHEDULED_ROW,
    starts_at: "2026-11-03T06:00:00+00:00",
  };

export const UTC_MIDNIGHT_ROW: ReservationChargeRow = {
  ...SCHEDULED_ROW,
  starts_at: "2026-11-03T00:00:00+00:00",
};

export const UTC_NEW_YEAR_ROW: ReservationChargeRow = {
  ...SCHEDULED_ROW,
  starts_at: "2027-01-01T03:30:00+00:00",
};
