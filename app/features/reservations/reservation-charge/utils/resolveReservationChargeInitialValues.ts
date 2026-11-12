import { STRING } from "@/app/constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeAmountText } from "./resolveReservationChargeAmountText";
import { resolveReservationChargeCurrencyOptions } from "./resolveReservationChargeCurrencyOptions";

export const resolveReservationChargeInitialValues = (
  proposal: ReservationChargeProposal
): ReservationChargeValues => {
  const [currency] =
    resolveReservationChargeCurrencyOptions(proposal);
  return {
    amountText: resolveReservationChargeAmountText(
      proposal,
      currency
    ),
    currency,
    paymentMethod: STRING.Empty,
  };
};
