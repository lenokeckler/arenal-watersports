import type { DEPOSIT_RESOLUTION_UNAVAILABLE_REASON } from "../constants/DepositResolutionUnavailableReason.constants";

export type DepositResolutionUnavailableReason =
  (typeof DEPOSIT_RESOLUTION_UNAVAILABLE_REASON)[keyof typeof DEPOSIT_RESOLUTION_UNAVAILABLE_REASON];
