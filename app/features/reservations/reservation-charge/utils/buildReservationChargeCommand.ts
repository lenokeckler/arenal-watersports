import { STRING } from "@/app/constants";
import { RESERVATION_CHARGE_EDGE_WHITESPACE_PATTERN } from "../constants/ReservationChargePaymentMethodPatterns.constants";
import type { ReservationChargeCommand } from "../models/ReservationChargeCommand.interface";
import type { ReservationChargeInput } from "../models/ReservationChargeInput.interface";
import { parseReservationChargeAmount } from "./parseReservationChargeAmount";
import { resolveReservationChargeSecondCurrency } from "./resolveReservationChargeSecondCurrency";

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
    ...(input.secondAmountText === null
      ? []
      : [
          {
            amount: parseReservationChargeAmount(
              input.secondAmountText
            ),
            currency:
              resolveReservationChargeSecondCurrency(
                input.currency
              ),
          },
        ]),
  ],
  paymentMethod: input.paymentMethod.replace(
    RESERVATION_CHARGE_EDGE_WHITESPACE_PATTERN,
    STRING.Empty
  ),
  reservationId: input.reservationId,
});
