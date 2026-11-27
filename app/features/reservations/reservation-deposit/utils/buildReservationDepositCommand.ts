import type { ReservationDepositCommand } from "../models/ReservationDepositCommand.type";
import type { ReservationDepositInput } from "../models/ReservationDepositInput.interface";
import { parseReservationDepositAmount } from "./parseReservationDepositAmount";

export const buildReservationDepositCommand = (
  input: ReservationDepositInput
): ReservationDepositCommand =>
  input.hasDeposit
    ? {
        amount: parseReservationDepositAmount(
          input.amountText
        ),
        currency: input.currency,
        hasDeposit: true,
        reservationId: input.reservationId,
      }
    : {
        hasDeposit: false,
        reservationId: input.reservationId,
      };
