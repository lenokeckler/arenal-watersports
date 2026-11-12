import {
  CURRENCY_CODE,
  CURRENCY_SYMBOL,
  CURRENCY_SYMBOL_SEPARATOR,
  RESERVATION_STATUS,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import type { ReservationCharge } from "../models/ReservationCharge.interface";
import {
  BOTH_PROPOSAL,
  CHARGE_PARENT_RESERVATION_ID,
  EMPTY_PROPOSAL,
  EXPECTED_SCHEDULED,
  MIXED_PROPOSAL,
} from "./ReservationCharge.constants";

export const SCREEN_ACCESS_REDIRECT = new Error(
  "NEXT_REDIRECT"
);
export const SCREEN_NOT_FOUND = "NEXT_NOT_FOUND";

export const EXPECTED_DATE_TIME =
  "lunes, 2 de noviembre de 2026, 14:30";
export const EXPECTED_DURATION = "1h 30min";
export const EXPECTED_PEOPLE = "6";
export const EXPECTED_USD_PROPOSAL = `${CURRENCY_SYMBOL.USD}${CURRENCY_SYMBOL_SEPARATOR}40.00`;
export const EXPECTED_CRC_PROPOSAL = formatMoney({
  amount: BOTH_PROPOSAL.CRC ?? 0,
  currency: CURRENCY_CODE.CRC,
});
export const EXPECTED_MIXED_USD_PROPOSAL = `${CURRENCY_SYMBOL.USD}${CURRENCY_SYMBOL_SEPARATOR}150.00`;
export const WHOLE_HOURS_MINUTES = 120;
export const EXPECTED_WHOLE_HOURS = "2h";
export const ONLY_MINUTES = 45;
export const EXPECTED_ONLY_MINUTES = "45min";

export const EXPECTED_DISPATCHED: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  status: RESERVATION_STATUS.DISPATCHED,
};

export const EXPECTED_CLOSED: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  status: RESERVATION_STATUS.CLOSED,
};

export const EXPECTED_CANCELLED: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  proposal: EMPTY_PROPOSAL,
  status: RESERVATION_STATUS.CANCELLED,
};

export const EXPECTED_SPLIT_CHILD: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  parentReservationId: CHARGE_PARENT_RESERVATION_ID,
  proposal: EMPTY_PROPOSAL,
};

export const EXPECTED_MIXED: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  proposal: MIXED_PROPOSAL,
};

export const CHARGEABLE_CHARGES = [
  EXPECTED_SCHEDULED,
  EXPECTED_DISPATCHED,
  EXPECTED_CLOSED,
] as const;

export const NO_CATALOG_PROPOSAL_CHARGE: ReservationCharge =
  {
    ...EXPECTED_SCHEDULED,
    proposal: EMPTY_PROPOSAL,
  };

export const ZERO_PROPOSAL_CHARGE: ReservationCharge = {
  ...EXPECTED_SCHEDULED,
  proposal: { CRC: 0, USD: 0 },
};

export const EXPECTED_ZERO_USD_PROPOSAL = `${CURRENCY_SYMBOL.USD}${CURRENCY_SYMBOL_SEPARATOR}0.00`;

export const DURATION_CASES: readonly (readonly [
  number,
  string,
])[] = [
  [30, "30min"],
  [60, "1h"],
  [90, "1h 30min"],
  [125, "2h 5min"],
  [1, "1min"],
];
