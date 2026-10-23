import { RESERVATION_CALENDAR_TIME } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import { RESERVATION_DETAIL_CURRENCY } from "../constants/ReservationDetail.constants";
import type { ReservationDetailCurrency } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_AMOUNT_FORMAT } from "../constants/ReservationDetailSectionsPresentation.constants";

export const formatReservationDetailAmount = (
  amount: number,
  currency: ReservationDetailCurrency
): string =>
  new Intl.NumberFormat(RESERVATION_CALENDAR_TIME.LOCALE, {
    currency,
    maximumFractionDigits:
      currency === RESERVATION_DETAIL_CURRENCY.USD
        ? RESERVATION_DETAIL_AMOUNT_FORMAT.USD_DECIMAL_DIGITS
        : RESERVATION_DETAIL_AMOUNT_FORMAT.CRC_DECIMAL_DIGITS,
    minimumFractionDigits:
      currency === RESERVATION_DETAIL_CURRENCY.USD
        ? RESERVATION_DETAIL_AMOUNT_FORMAT.USD_DECIMAL_DIGITS
        : RESERVATION_DETAIL_AMOUNT_FORMAT.CRC_DECIMAL_DIGITS,
    style: RESERVATION_DETAIL_AMOUNT_FORMAT.CURRENCY_STYLE,
  }).format(amount);
