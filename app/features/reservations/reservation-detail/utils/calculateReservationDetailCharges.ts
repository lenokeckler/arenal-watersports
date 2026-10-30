import {
  RESERVATION_DETAIL_CHARGE_KIND,
  RESERVATION_DETAIL_CHARGE_STATUS,
  RESERVATION_DETAIL_CURRENCIES,
  RESERVATION_DETAIL_CURRENCY,
  RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR,
  RESERVATION_DETAIL_ZERO_MINOR_UNITS,
} from "../constants/ReservationDetail.constants";
import type { NullableRef } from "@/app/types";
import type { ReservationDetailCharge } from "../models/ReservationDetailCharge.interface";
import type { ReservationDetailChargeSummary } from "../models/ReservationDetailChargeSummary.interface";
import type { ReservationDetailMoneyEntry } from "../models/ReservationDetailMoneyEntry.interface";
import type { ReservationDetailPricingSource } from "../models/ReservationDetailPricingSource.interface";
import type { ReservationDetailRecordedCharge } from "../models/ReservationDetailRecordedCharge.interface";
import { calculateReservationDetailExtraTimeCharges } from "./calculateReservationDetailExtraTimeCharges";
import { summarizeReservationDetailRefunds } from "./summarizeReservationDetailRefunds";

const toMinorUnits = (amount: number): number =>
  Math.round(
    amount * RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR
  );

const toMajorUnits = (amount: number): number =>
  amount / RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR;

const sumCurrencyAmount = (
  entries: ReservationDetailMoneyEntry[],
  currency: ReservationDetailCharge["currency"]
): number =>
  entries.reduce(
    (total, entry) =>
      entry.currency === currency
        ? total + toMinorUnits(entry.amount)
        : total,
    0
  );

const getTargetAmount = (
  pricing: NullableRef<ReservationDetailPricingSource>,
  currency: ReservationDetailCharge["currency"]
): NullableRef<number> => {
  if (!pricing) {
    return null;
  }

  const agreedAmount =
    currency === RESERVATION_DETAIL_CURRENCY.USD
      ? pricing.agreed_amount_usd
      : pricing.agreed_amount_crc;
  const listAmount =
    currency === RESERVATION_DETAIL_CURRENCY.USD
      ? pricing.list_amount_usd
      : pricing.list_amount_crc;

  const targetAmount = agreedAmount ?? listAmount;
  return targetAmount === null
    ? null
    : toMinorUnits(targetAmount);
};

const getReservationDetailChargeStatus = (
  configuredCurrencies: ReservationDetailCharge[]
): ReservationDetailChargeSummary["status"] => {
  if (configuredCurrencies.length === 0) {
    return RESERVATION_DETAIL_CHARGE_STATUS.UNPRICED;
  }

  if (
    configuredCurrencies.every(
      (charge) =>
        charge.amountCharged >=
        (charge.amountTarget ??
          RESERVATION_DETAIL_ZERO_MINOR_UNITS)
    )
  ) {
    return RESERVATION_DETAIL_CHARGE_STATUS.PAID;
  }

  return configuredCurrencies.some(
    (charge) =>
      charge.amountCharged >
      RESERVATION_DETAIL_ZERO_MINOR_UNITS
  )
    ? RESERVATION_DETAIL_CHARGE_STATUS.PARTIAL
    : RESERVATION_DETAIL_CHARGE_STATUS.PENDING;
};

const createCharge = (
  pricing: NullableRef<ReservationDetailPricingSource>,
  recordedCharges: ReservationDetailRecordedCharge[],
  currency: ReservationDetailCharge["currency"]
): ReservationDetailCharge => {
  const amountTarget = getTargetAmount(pricing, currency);
  const amountCharged = sumCurrencyAmount(
    recordedCharges.filter(
      (charge) =>
        charge.kind ===
        RESERVATION_DETAIL_CHARGE_KIND.TARIFF
    ),
    currency
  );

  return {
    amountCharged: toMajorUnits(amountCharged),
    amountRemaining:
      amountTarget === null
        ? null
        : toMajorUnits(
            Math.max(
              amountTarget - amountCharged,
              RESERVATION_DETAIL_ZERO_MINOR_UNITS
            )
          ),
    amountTarget:
      amountTarget === null
        ? null
        : toMajorUnits(amountTarget),
    currency,
  };
};

export const calculateReservationDetailCharges = (
  pricing: NullableRef<ReservationDetailPricingSource>,
  recordedCharges: ReservationDetailRecordedCharge[],
  refunds: ReservationDetailMoneyEntry[]
): ReservationDetailChargeSummary => {
  const charges = RESERVATION_DETAIL_CURRENCIES.map(
    (currency) =>
      createCharge(pricing, recordedCharges, currency)
  );
  const configuredCurrencies = charges.filter(
    (charge) => charge.amountTarget !== null
  );

  return {
    charges,
    extraTimeCharges:
      calculateReservationDetailExtraTimeCharges(
        recordedCharges
      ),
    refunds: summarizeReservationDetailRefunds(refunds),
    status: getReservationDetailChargeStatus(
      configuredCurrencies
    ),
  };
};
