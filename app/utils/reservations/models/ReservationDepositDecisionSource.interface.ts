import type { ReservationDepositAmount } from "./ReservationDepositAmount.interface";

export interface ReservationDepositDecisionSource {
  declined: boolean;
  deposits: readonly ReservationDepositAmount[];
}
