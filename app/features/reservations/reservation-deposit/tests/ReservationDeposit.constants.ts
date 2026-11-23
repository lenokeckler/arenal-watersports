import {
  CURRENCY_CODE,
  RESERVATION_DEPOSIT_DECISION_KIND,
  RESERVATION_STATUS,
} from "@/app/constants";
import type { ReservationDeposit } from "../models/ReservationDeposit.interface";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import type { ReservationDepositRow } from "../models/ReservationDepositRow.type";

export const DEPOSIT_RESERVATION_ID =
  "e2c20000-0000-4000-8000-000000000901";
export const MALFORMED_RESERVATION_ID = "not-a-uuid";

export const BOTH_PROPOSAL: ReservationDepositProposal = {
  [CURRENCY_CODE.CRC]: 100000,
  [CURRENCY_CODE.USD]: 200,
};

export const CRC_ONLY_PROPOSAL: ReservationDepositProposal =
  {
    [CURRENCY_CODE.CRC]: 100000,
    [CURRENCY_CODE.USD]: 0,
  };

export const EMPTY_PROPOSAL: ReservationDepositProposal = {
  [CURRENCY_CODE.CRC]: 0,
  [CURRENCY_CODE.USD]: 0,
};

export const SPLIT_PARENT_ID =
  "e2c20000-0000-4000-8000-000000000902";

export const UNDECIDED_ROW: ReservationDepositRow = {
  code: "R-000290",
  customer_name: "Grupo Garantía",
  deposit_declination: null,
  deposits: [],
  id: DEPOSIT_RESERVATION_ID,
  parent_reservation_id: null,
  starts_at: "2026-11-20T20:30:00+00:00",
  status: RESERVATION_STATUS.SCHEDULED,
};

export const RECEIVED_ROW: ReservationDepositRow = {
  ...UNDECIDED_ROW,
  deposits: [{ amount: 200, currency: CURRENCY_CODE.USD }],
};

export const DECLINED_ROW: ReservationDepositRow = {
  ...UNDECIDED_ROW,
  deposit_declination: {
    reservation_id: DEPOSIT_RESERVATION_ID,
  },
};

export const SPLIT_CHILD_ROW: ReservationDepositRow = {
  ...UNDECIDED_ROW,
  parent_reservation_id: SPLIT_PARENT_ID,
};

export const BEFORE_COSTA_RICA_MIDNIGHT_ROW: ReservationDepositRow =
  {
    ...UNDECIDED_ROW,
    starts_at: "2026-11-03T03:30:00+00:00",
  };

export const UNDECIDED_DEPOSIT: ReservationDeposit = {
  code: "R-000290",
  customerName: "Grupo Garantía",
  date: "2026-11-20",
  decision: {
    kind: RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED,
  },
  id: DEPOSIT_RESERVATION_ID,
  parentReservationId: null,
  proposal: BOTH_PROPOSAL,
  status: RESERVATION_STATUS.SCHEDULED,
  time: "14:30",
};
