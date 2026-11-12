import type { CurrencyCode } from "@/app/constants";
import { STRING } from "@/app/constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";
import type { ReservationChargeValues } from "../models/ReservationChargeValues.interface";
import { resolveReservationChargeAmountText } from "./resolveReservationChargeAmountText";

export const resolveReservationChargeCurrencySwitch = (
  values: ReservationChargeValues,
  proposal: ReservationChargeProposal,
  currency: CurrencyCode
): ReservationChargeValues => {
  const isUntouched =
    values.amountText === STRING.Empty ||
    values.amountText ===
      resolveReservationChargeAmountText(
        proposal,
        values.currency
      );
  return {
    ...values,
    amountText: isUntouched
      ? resolveReservationChargeAmountText(
          proposal,
          currency
        )
      : values.amountText,
    currency,
  };
};
