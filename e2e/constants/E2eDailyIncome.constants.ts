import { CURRENCY_CODE } from "@/app/constants";
import type { Database } from "@/app/types";
import type { E2eChargeSeed } from "../support/models/E2eChargeSeed.interface";

export const E2E_INCOME_METHOD = {
  NAME_PREFIX: "Método E2E ",
  SUFFIX_LENGTH: 8,
} as const;

export const E2E_CHARGE_KIND: Database["public"]["Enums"]["charge_kind"] =
  "tariff";

export const E2E_CHARGE_SEEDS = {
  CRC: { amount: 25000, currency: CURRENCY_CODE.CRC },
  USD: { amount: 85.5, currency: CURRENCY_CODE.USD },
} as const satisfies Record<string, E2eChargeSeed>;

export const E2E_CHARGE_ERROR = {
  OPERATION_INSERT_CHARGE: "insert the E2E charge",
  OPERATION_REMOVE: "remove the E2E charges",
} as const;

export const E2E_DAILY_INCOME_SCREENSHOT_BASENAME = {
  CARDS: "01-daily-income-cards",
} as const;
