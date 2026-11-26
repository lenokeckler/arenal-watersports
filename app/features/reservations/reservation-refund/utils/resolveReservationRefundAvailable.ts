import type { CurrencyCode } from "@/app/constants";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";

const NO_AMOUNT = 0;

export const resolveReservationRefundAvailable = (
  refundable: ReservationRefundableAmount[],
  currency: CurrencyCode
): number =>
  refundable.find((entry) => entry.currency === currency)
    ?.amount ?? NO_AMOUNT;
