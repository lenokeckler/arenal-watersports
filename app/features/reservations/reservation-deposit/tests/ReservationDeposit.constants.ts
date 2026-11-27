import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";

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
