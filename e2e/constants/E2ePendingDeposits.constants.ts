import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import type { E2eDepositSeed } from "../support/models/E2eDepositSeed.interface";

export const E2E_DEPOSIT_CUSTOMER = {
  NAME_PREFIX: "Cliente E2E ",
  SUFFIX_LENGTH: 12,
} as const;

export const E2E_DEPOSIT_RESERVATION = {
  DURATION_MINUTES: 60,
  PEOPLE_COUNT: 2,
  STARTS_AT: "2030-01-15T15:00:00Z",
  TYPE: "rental",
} as const;

export const E2E_DEPOSIT_RESOLUTION_AT =
  "2030-01-15T18:00:00Z";

export const E2E_DEPOSIT_SEEDS = {
  CRC: {
    amount: 25000,
    currency: CURRENCY_CODE.CRC,
    status: DEPOSIT_STATUS.HELD,
  },
  RETURNED: {
    amount: 75,
    currency: CURRENCY_CODE.USD,
    status: DEPOSIT_STATUS.RETURNED,
  },
  USD: {
    amount: 50,
    currency: CURRENCY_CODE.USD,
    status: DEPOSIT_STATUS.HELD,
  },
} as const satisfies Record<string, E2eDepositSeed>;

export const E2E_DEPOSIT_ERROR = {
  OPERATION_INSERT_DEPOSIT: "insert the E2E deposit",
  OPERATION_INSERT_RESERVATION:
    "insert the E2E reservation",
  OPERATION_REMOVE: "remove the E2E deposits",
  OPERATION_REMOVE_RESERVATION:
    "remove the E2E reservation",
  OPERATION_SEED: "seed the E2E deposit",
} as const;

export const E2E_PENDING_DEPOSITS_SCREENSHOT_BASENAME = {
  LIST: "01-pending-deposits-list",
} as const;
