import { CURRENCY_ORDER } from "@/app/constants";
import { fromMinorUnits } from "@/app/utils/money/fromMinorUnits";
import { toMinorUnits } from "@/app/utils/money/toMinorUnits";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import type { ReservationDetailMoneyEntry } from "../models/ReservationDetailMoneyEntry.interface";
import type { ReservationDetailRecordedCharge } from "../models/ReservationDetailRecordedCharge.interface";

const sumMinorUnits = (
  entries: readonly ReservationDetailMoneyEntry[],
  currency: ReservationRefundableAmount["currency"]
): number =>
  entries.reduce(
    (total, entry) =>
      entry.currency === currency
        ? total + toMinorUnits(entry.amount)
        : total,
    0
  );

export const calculateReservationDetailRefundable = (
  recordedCharges: readonly ReservationDetailRecordedCharge[],
  refunds: readonly ReservationDetailMoneyEntry[]
): ReservationRefundableAmount[] =>
  CURRENCY_ORDER.map((currency) => ({
    amount: fromMinorUnits(
      sumMinorUnits(recordedCharges, currency) -
        sumMinorUnits(refunds, currency)
    ),
    currency,
  }));
