import type { CurrencyCode } from "@/app/constants";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";
import type { ReservationDepositValues } from "../models/ReservationDepositValues.interface";
import { resolveReservationDepositAmountText } from "./resolveReservationDepositAmountText";

export const resolveReservationDepositCurrencySwitch = (
  values: ReservationDepositValues,
  proposal: ReservationDepositProposal,
  currency: CurrencyCode
): ReservationDepositValues => ({
  ...values,
  amountText: resolveReservationDepositAmountText(
    proposal,
    currency
  ),
  currency,
});
