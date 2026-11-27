import type { ReservationChargeInput } from "../models/ReservationChargeInput.interface";
import type { ReservationChargePart } from "../models/ReservationChargePart.interface";
import { parseReservationChargeAmount } from "./parseReservationChargeAmount";
import { resolveReservationChargeSecondCurrency } from "./resolveReservationChargeSecondCurrency";

export const buildReservationChargeSecondPart = (
  input: ReservationChargeInput
): readonly ReservationChargePart[] =>
  input.secondAmountText === null
    ? []
    : [
        {
          amount: parseReservationChargeAmount(
            input.secondAmountText
          ),
          currency: resolveReservationChargeSecondCurrency(
            input.currency
          ),
        },
      ];
