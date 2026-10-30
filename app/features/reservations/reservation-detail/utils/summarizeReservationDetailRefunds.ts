import {
  RESERVATION_DETAIL_CURRENCIES,
  RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR,
  RESERVATION_DETAIL_ZERO_MINOR_UNITS,
} from "../constants/ReservationDetail.constants";
import type { ReservationDetailMoneyEntry } from "../models/ReservationDetailMoneyEntry.interface";
import type { ReservationDetailRefund } from "../models/ReservationDetailRefund.interface";

const sumRefundsByCurrency = (
  refunds: ReservationDetailMoneyEntry[],
  currency: ReservationDetailMoneyEntry["currency"]
): number =>
  refunds
    .filter((refund) => refund.currency === currency)
    .reduce(
      (total, refund) =>
        total +
        Math.round(
          refund.amount *
            RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR
        ),
      RESERVATION_DETAIL_ZERO_MINOR_UNITS
    );

export const summarizeReservationDetailRefunds = (
  refunds: ReservationDetailMoneyEntry[]
): ReservationDetailRefund[] =>
  RESERVATION_DETAIL_CURRENCIES.map((currency) => ({
    amount:
      sumRefundsByCurrency(refunds, currency) /
      RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR,
    currency,
  }));
