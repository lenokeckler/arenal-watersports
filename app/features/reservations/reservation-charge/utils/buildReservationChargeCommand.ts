import type { ReservationChargeCommand } from "../models/ReservationChargeCommand.interface";
import type { ReservationChargeInput } from "../models/ReservationChargeInput.interface";
import { buildReservationChargeSecondPart } from "./buildReservationChargeSecondPart";
import { parseReservationChargeAmount } from "./parseReservationChargeAmount";
import { resolveReservationChargePaymentMethod } from "./resolveReservationChargePaymentMethod";

export const buildReservationChargeCommand = (
  input: ReservationChargeInput
): ReservationChargeCommand => ({
  parts: [
    {
      amount: parseReservationChargeAmount(
        input.amountText
      ),
      currency: input.currency,
    },
    ...buildReservationChargeSecondPart(input),
  ],
  paymentMethod:
    resolveReservationChargePaymentMethod(input),
  reservationId: input.reservationId,
});
