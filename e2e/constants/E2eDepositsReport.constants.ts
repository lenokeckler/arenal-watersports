import {
  CURRENCY_CODE,
  DEPOSIT_STATUS,
} from "@/app/constants";
import type { E2eDepositSeed } from "../support/models/E2eDepositSeed.interface";
import { E2E_DEPOSIT_SEEDS } from "./E2ePendingDeposits.constants";

export const E2E_DEPOSITS_REPORT_SEEDS = {
  BLANK_REASON: {
    amount: 80,
    currency: CURRENCY_CODE.USD,
    resolvedAt: "2030-02-08T18:00:00Z",
    retainedAmount: 20,
    retentionReason: "   ",
    status: DEPOSIT_STATUS.RETAINED,
  },
  HELD_CRC: E2E_DEPOSIT_SEEDS.CRC,
  HELD_USD: E2E_DEPOSIT_SEEDS.USD,
  PARTIAL_CRC: {
    amount: 60000,
    currency: CURRENCY_CODE.CRC,
    resolvedAt: "2030-02-12T18:00:00Z",
    retainedAmount: 15000,
    retentionReason: "Chaleco salvavidas perdido",
    status: DEPOSIT_STATUS.PARTIALLY_RETAINED,
  },
  RETAINED_USD: {
    amount: 100,
    currency: CURRENCY_CODE.USD,
    resolvedAt: "2030-02-10T18:00:00Z",
    retainedAmount: 40,
    retentionReason: "Remo roto en la devolución",
    status: DEPOSIT_STATUS.RETAINED,
  },
} as const satisfies Record<string, E2eDepositSeed>;

export const E2E_DEPOSITS_REPORT_TOTAL_PATTERN = /total/i;

export const E2E_DEPOSITS_REPORT_SCREENSHOT_BASENAME = {
  BLANK_REASON: "02-deposits-report-blank-reason",
  LIST: "01-deposits-report-list",
} as const;
