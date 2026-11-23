import { STRING, type CurrencyCode } from "@/app/constants";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { resolveReservationDepositAmountText } from "./resolveReservationDepositAmountText";

export const resolveReservationDepositCurrencySwitch = (
  values: ReservationDepositValues,
  proposal: ReservationDepositProposal,
  currency: CurrencyCode
): ReservationDepositValues => {
  const isUntouched =
    values.amountText.trim() === STRING.Empty ||
    values.amountText ===
      resolveReservationDepositAmountText(
        proposal,
        values.currency
      );
  return {
    ...values,
    amountText: isUntouched
      ? resolveReservationDepositAmountText(
          proposal,
          currency
        )
      : values.amountText,
    currency,
  };
};
