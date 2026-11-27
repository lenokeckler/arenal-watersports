import { CURRENCY_CODE, STRING } from "@/app/constants";
import type { ReservationDepositErrors } from "../models/ReservationDepositErrors.interface";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";

export const RESERVATION_DEPOSIT_NO_ERRORS: ReservationDepositErrors =
  {};

export const RESERVATION_DEPOSIT_NO_FORM_ERROR: string =
  STRING.Empty;

export const RESERVATION_DEPOSIT_NO_PROPOSAL: ReservationDepositProposal =
  {
    [CURRENCY_CODE.CRC]: 0,
    [CURRENCY_CODE.USD]: 0,
  };
