import { normalizeMoneyAmountText } from "@/app/utils/money/normalizeMoneyAmountText";
import { RESERVATION_EXTRA_TIME_OUTCOME } from "../constants/ReservationExtraTimeOutcome.constants";
import type { ReservationExtraTimeCommand } from "../models/ReservationExtraTimeCommand.interface";
import type { ReservationExtraTimeInput } from "../models/ReservationExtraTimeInput.interface";
import type { ReservationExtraTimeOutcome } from "../models/ReservationExtraTimeOutcome.type";
import { resolveReservationExtraTimePaymentMethod } from "./resolveReservationExtraTimePaymentMethod";

export const buildReservationExtraTimeCommand = (
  input: ReservationExtraTimeInput,
  outcome: ReservationExtraTimeOutcome
): ReservationExtraTimeCommand => ({
  charge:
    outcome === RESERVATION_EXTRA_TIME_OUTCOME.CHARGED &&
    input.paymentChoice !== null
      ? {
          amount: Number(
            normalizeMoneyAmountText(
              input.amountText.trim()
            )
          ),
          currency: input.currency,
          paymentMethod:
            resolveReservationExtraTimePaymentMethod(
              input.paymentChoice,
              input.otherPaymentMethod
            ),
        }
      : null,
  outcome,
  reservationId: input.reservationId,
});
