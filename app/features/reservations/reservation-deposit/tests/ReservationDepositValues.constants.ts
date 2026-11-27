import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationDepositInput } from "../models/ReservationDepositInput.interface";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { DEPOSIT_RESERVATION_ID } from "./ReservationDeposit.constants";

export const USD_PROPOSAL_TEXT = "200";
export const CRC_PROPOSAL_TEXT = "100000";
export const EDITED_AMOUNT_TEXT = "150";

export const RECEIVED_DEPOSIT_VALUES: ReservationDepositValues =
  {
    amountText: USD_PROPOSAL_TEXT,
    currency: CURRENCY_CODE.USD,
    hasDeposit: true,
  };

export const RECEIVED_DEPOSIT_INPUT: ReservationDepositInput =
  {
    ...RECEIVED_DEPOSIT_VALUES,
    reservationId: DEPOSIT_RESERVATION_ID,
  };

export const DECLINED_DEPOSIT_INPUT: ReservationDepositInput =
  {
    ...RECEIVED_DEPOSIT_INPUT,
    amountText: "abc",
    hasDeposit: false,
  };
