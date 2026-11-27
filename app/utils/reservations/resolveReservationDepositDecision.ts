import { RESERVATION_DEPOSIT_DECISION_KIND } from "@/app/constants";
import type { ReservationDepositDecision } from "./models/ReservationDepositDecision.type";
import type { ReservationDepositDecisionSource } from "./models/ReservationDepositDecisionSource.interface";

export const resolveReservationDepositDecision = ({
  declined,
  deposits,
}: ReservationDepositDecisionSource): ReservationDepositDecision => {
  const [firstDeposit] = deposits;

  if (firstDeposit) {
    return {
      amount: firstDeposit.amount,
      currency: firstDeposit.currency,
      kind: RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED,
    };
  }

  return {
    kind: declined
      ? RESERVATION_DEPOSIT_DECISION_KIND.DECLINED
      : RESERVATION_DEPOSIT_DECISION_KIND.UNDECIDED,
  };
};
