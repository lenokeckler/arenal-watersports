export const RESERVATION_DEPOSIT_DECISION_KIND = {
  DECLINED: "declined",
  RECEIVED: "received",
  UNDECIDED: "undecided",
} as const;

export type ReservationDepositDecisionKind =
  (typeof RESERVATION_DEPOSIT_DECISION_KIND)[keyof typeof RESERVATION_DEPOSIT_DECISION_KIND];
