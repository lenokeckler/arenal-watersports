import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_CHARGE_CURRENCY_ORDER } from "../constants/ReservationChargeUi.constants";
import type { ReservationChargeProposal } from "../models/ReservationChargeProposal.type";

export const resolveReservationChargeInitialCurrency = (
  proposal: ReservationChargeProposal
): CurrencyCode =>
  RESERVATION_CHARGE_CURRENCY_ORDER.find(
    (currency) => proposal[currency] !== null
  ) ?? RESERVATION_CHARGE_CURRENCY_ORDER[0];
