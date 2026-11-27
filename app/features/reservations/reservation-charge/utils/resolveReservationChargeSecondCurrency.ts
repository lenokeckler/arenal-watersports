import type { CurrencyCode } from "@/app/constants";
import { RESERVATION_CHARGE_OTHER_CURRENCY } from "../constants/ReservationChargeUi.constants";

export const resolveReservationChargeSecondCurrency = (
  currency: CurrencyCode
): CurrencyCode =>
  RESERVATION_CHARGE_OTHER_CURRENCY[currency];
