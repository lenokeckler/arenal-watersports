import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_CHARGE_CURRENCY_ORDER } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";

export const resolveReservationChargeCurrencyOptions = (
  proposal: ReservationChargeProposal
): readonly CurrencyCode[] => {
  const proposed = RESERVATION_CHARGE_CURRENCY_ORDER.filter(
    (currency) => proposal[currency] !== null
  );
  return proposed.length > 0
    ? proposed
    : RESERVATION_CHARGE_CURRENCY_ORDER;
};
