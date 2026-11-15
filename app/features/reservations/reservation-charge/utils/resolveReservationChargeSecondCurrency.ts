import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_CHARGE_CURRENCY_ORDER } from "../constants/ReservationChargeUi.constants";

export const resolveReservationChargeSecondCurrency = (
  currency: CurrencyCode
): CurrencyCode =>
  RESERVATION_CHARGE_CURRENCY_ORDER.filter(
    (candidate) => candidate !== currency
  )[0];
