import { STRING, type CurrencyCode } from "@/app/constants";
import type { ReservationDepositProposal } from "../models/ReservationDepositProposal.type";

export const resolveReservationDepositAmountText = (
  proposal: ReservationDepositProposal,
  currency: CurrencyCode
): string => {
  const amount = proposal[currency];
  return amount > 0 ? String(amount) : STRING.Empty;
};
