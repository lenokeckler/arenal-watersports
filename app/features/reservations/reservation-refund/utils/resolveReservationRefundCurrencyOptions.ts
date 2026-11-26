import type { CurrencyCode } from "@/app/constants";
import type { ReservationRefundableAmount } from "@/app/utils/reservations/models/ReservationRefundableAmount.interface";
import { RESERVATION_REFUND_CURRENCY_ORDER } from "../constants/ReservationRefundUi.constants";

export const resolveReservationRefundCurrencyOptions = (
  refundable: ReservationRefundableAmount[]
): readonly CurrencyCode[] => {
  const options = RESERVATION_REFUND_CURRENCY_ORDER.filter(
    (currency) =>
      refundable.some(
        (entry) =>
          entry.currency === currency && entry.amount > 0
      )
  );
  return options.length > 0
    ? options
    : RESERVATION_REFUND_CURRENCY_ORDER;
};
