import { STRING } from "@/app/constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeAmountText } from "./resolveReservationChargeAmountText";
import { resolveReservationChargeInitialCurrency } from "./resolveReservationChargeInitialCurrency";

export const resolveReservationChargeInitialValues = (
  proposal: ReservationChargeProposal
): ReservationChargeValues => {
  const currency =
    resolveReservationChargeInitialCurrency(proposal);
  return {
    amountText: resolveReservationChargeAmountText(
      proposal,
      currency
    ),
    currency,
    otherPaymentMethod: STRING.Empty,
    paymentChoice: null,
    secondAmountText: null,
  };
};
