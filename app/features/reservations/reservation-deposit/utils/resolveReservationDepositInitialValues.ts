import { CURRENCY_CODE } from "@/app/constants";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { resolveReservationDepositAmountText } from "./resolveReservationDepositAmountText";

const { CRC, USD } = CURRENCY_CODE;

export const resolveReservationDepositInitialValues = (
  proposal: ReservationDepositProposal
): ReservationDepositValues => {
  const currency =
    proposal[USD] <= 0 && proposal[CRC] > 0 ? CRC : USD;
  return {
    amountText: resolveReservationDepositAmountText(
      proposal,
      currency
    ),
    currency,
    hasDeposit: proposal[USD] > 0 || proposal[CRC] > 0,
  };
};
