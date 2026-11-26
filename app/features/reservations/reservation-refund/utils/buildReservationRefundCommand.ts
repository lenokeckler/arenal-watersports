import type { ReservationRefundCommand } from "../models/ReservationRefundCommand.interface";
import type { ReservationRefundInput } from "../models/ReservationRefundInput.interface";
import { parseReservationRefundAmount } from "./parseReservationRefundAmount";
import { resolveReservationRefundReasonText } from "./resolveReservationRefundReasonText";

export const buildReservationRefundCommand = (
  input: ReservationRefundInput
): ReservationRefundCommand => ({
  amount: parseReservationRefundAmount(input.amountText),
  currency: input.currency,
  reason: resolveReservationRefundReasonText(input),
  reservationId: input.reservationId,
});
