import { RESERVATION_CALENDAR_TIME } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import { RESERVATION_DETAIL_CURRENCY } from "../constants/ReservationDetail.constants";
import type { ReservationDetailCurrency } from "../constants/ReservationDetail.constants";
import { RESERVATION_DETAIL_AMOUNT_FORMAT } from "../constants/ReservationDetailSectionsPresentation.constants";

const getAmountFractionDigits = (
  amount: number,
  currency: ReservationDetailCurrency
): number => {
  if (
    currency === RESERVATION_DETAIL_CURRENCY.CRC &&
    Number.isInteger(amount)
  ) {
    return RESERVATION_DETAIL_AMOUNT_FORMAT.WHOLE_AMOUNT_DIGITS;
  }

  return RESERVATION_DETAIL_AMOUNT_FORMAT.FRACTIONAL_AMOUNT_DIGITS;
};

const getAmountLocale = (
  currency: ReservationDetailCurrency
): string =>
  currency === RESERVATION_DETAIL_CURRENCY.USD
    ? RESERVATION_DETAIL_AMOUNT_FORMAT.USD_LOCALE
    : RESERVATION_CALENDAR_TIME.LOCALE;

const getCurrencySymbol = (
  currency: ReservationDetailCurrency
): string =>
  currency === RESERVATION_DETAIL_CURRENCY.CRC
    ? RESERVATION_DETAIL_AMOUNT_FORMAT.CRC_SYMBOL
    : RESERVATION_DETAIL_AMOUNT_FORMAT.USD_SYMBOL;

export const formatReservationDetailAmount = (
  amount: number,
  currency: ReservationDetailCurrency
): string => {
  const fractionDigits = getAmountFractionDigits(
    amount,
    currency
  );
  const formattedAmount = new Intl.NumberFormat(
    getAmountLocale(currency),
    {
      maximumFractionDigits: fractionDigits,
      minimumFractionDigits: fractionDigits,
    }
  ).format(amount);

  return `${getCurrencySymbol(currency)}${RESERVATION_DETAIL_AMOUNT_FORMAT.CURRENCY_SYMBOL_SEPARATOR}${formattedAmount}`;
};
