import {
  RESERVATION_DETAIL_CHARGE_STATUS,
  RESERVATION_DETAIL_CURRENCIES,
  RESERVATION_DETAIL_ZERO_MINOR_UNITS,
} from "../constants/ReservationDetail.constants";
import type { NullableRef } from "@/app/types";
import type { ReservationDetailChargeSummary } from "../models/ReservationDetailChargeSummary.interface";
import type { ReservationDetailMoneyEntry } from "../models/ReservationDetailMoneyEntry.interface";
import type { ReservationDetailPricingSource } from "../models/ReservationDetailPricingSource.interface";
import type { ReservationDetailRecordedCharge } from "../models/ReservationDetailRecordedCharge.interface";
import { calculateReservationDetailCharges } from "./calculateReservationDetailCharges";
import { calculateReservationDetailExtraTimeCharges } from "./calculateReservationDetailExtraTimeCharges";
import { summarizeReservationDetailRefunds } from "./summarizeReservationDetailRefunds";

const createParentChargeSummary =
  (): ReservationDetailChargeSummary => ({
    charges: RESERVATION_DETAIL_CURRENCIES.map(
      (currency) => ({
        amountChargedGross:
          RESERVATION_DETAIL_ZERO_MINOR_UNITS,
        amountChargedNet:
          RESERVATION_DETAIL_ZERO_MINOR_UNITS,
        amountCredit: null,
        amountRemaining: null,
        amountTarget: null,
        currency,
      })
    ),
    extraTimeCharges: [],
    refunds: [],
    status: RESERVATION_DETAIL_CHARGE_STATUS.PARENT,
  });

export const resolveReservationDetailChargeSummary = (
  parentReservationId: NullableRef<string>,
  pricing: NullableRef<ReservationDetailPricingSource>,
  recordedCharges: ReservationDetailRecordedCharge[],
  refunds: ReservationDetailMoneyEntry[]
): ReservationDetailChargeSummary =>
  parentReservationId
    ? {
        ...createParentChargeSummary(),
        extraTimeCharges:
          calculateReservationDetailExtraTimeCharges(
            recordedCharges
          ),
        refunds: summarizeReservationDetailRefunds(refunds),
      }
    : calculateReservationDetailCharges(
        pricing,
        recordedCharges,
        refunds
      );
