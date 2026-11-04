export const DEPOSIT_STATUS = {
  HELD: "held",
  PARTIALLY_RETAINED: "partially_retained",
  RETAINED: "retained",
  RETURNED: "returned",
} as const;

export type DepositStatus =
  (typeof DEPOSIT_STATUS)[keyof typeof DEPOSIT_STATUS];

export const RETAINED_DEPOSIT_STATUSES = [
  DEPOSIT_STATUS.RETAINED,
  DEPOSIT_STATUS.PARTIALLY_RETAINED,
] as const;
