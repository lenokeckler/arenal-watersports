import type { ReservationRefundableAmount } from "./models/ReservationRefundableAmount.interface";

export const hasReservationRefundable = (
  amounts: readonly ReservationRefundableAmount[]
): boolean => amounts.some(({ amount }) => amount > 0);
