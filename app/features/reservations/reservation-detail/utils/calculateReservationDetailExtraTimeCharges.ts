import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CURRENCIES,
  RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR,
  RESERVATION_DETAIL_ZERO_MINOR_UNITS,
} from "../constants/ReservationDetail.constants";
import type { ReservationDetailExtraTimeCharge } from "../models/ReservationDetailExtraTimeCharge.interface";
import type { ReservationDetailRecordedCharge } from "../models/ReservationDetailRecordedCharge.interface";

const sumExtraTimeCurrency = (
  charges: ReservationDetailRecordedCharge[],
  currency: ReservationDetailExtraTimeCharge["currency"]
): number =>
  charges
    .filter(
      (charge) =>
        charge.kind ===
          RESERVATION_DETAIL_CHARGE_KIND.EXTRA_TIME &&
        charge.currency === currency
    )
    .reduce((total, charge) => total + charge.amount, 0);

export const calculateReservationDetailExtraTimeCharges = (
  charges: ReservationDetailRecordedCharge[]
): ReservationDetailExtraTimeCharge[] =>
  RESERVATION_DETAIL_CURRENCIES.map((currency) => ({
    amountCharged:
      Math.round(
        sumExtraTimeCurrency(charges, currency) *
          RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR
      ) / RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR,
    currency,
  })).filter(
    (charge) =>
      charge.amountCharged >
      RESERVATION_DETAIL_ZERO_MINOR_UNITS
  );
