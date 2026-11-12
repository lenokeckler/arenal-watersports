import type { CurrencyCode } from "@/app/constants";
import { STRING } from "@/app/constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";

export const resolveReservationChargeAmountText = (
  proposal: ReservationChargeProposal,
  currency: CurrencyCode
): string => {
  const amount = proposal[currency];
  return amount === null ? STRING.Empty : String(amount);
};
