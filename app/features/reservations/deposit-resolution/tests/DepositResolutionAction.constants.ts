import type { DepositResolutionInput } from "../models/DepositResolutionInput.interface";
import { mapDepositResolutionRecorded } from "../utils/mapDepositResolutionRecorded";
import {
  DAMAGE_REASON,
  PARTIAL_RECORD_ROW,
  RESOLUTION_DEPOSIT_ID,
} from "./DepositResolution.constants";

export const PARTIAL_INPUT: DepositResolutionInput = {
  depositId: RESOLUTION_DEPOSIT_ID,
  reasonText: DAMAGE_REASON,
  returnedText: "100",
};

export const PARTIAL_COMMAND = {
  depositId: RESOLUTION_DEPOSIT_ID,
  reason: DAMAGE_REASON,
  returnedAmount: 100,
};

export const PARTIAL_RECORDED =
  mapDepositResolutionRecorded(PARTIAL_RECORD_ROW);

export const RESOLUTION_READ_FAILURE = {
  code: "XX000",
  details: "",
  hint: "",
  message: "database unavailable",
};

export const RESOLUTION_UNEXPECTED_ERROR = new Error(
  "Unexpected resolution failure"
);

export const RESOLUTION_ACCESS_REDIRECT = new Error(
  "NEXT_REDIRECT"
);

export const RESOLUTION_NETWORK_FAILURE = new TypeError(
  "Failed to fetch"
);
