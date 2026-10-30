import { CURRENCY_CODE } from "@/app/constants";
import type { Database } from "@/app/types";
import type { Money } from "@/app/utils/money/models/Money.interface";

type PublicEnums = Database["public"]["Enums"];

export const E2E_INCOME_TABLE = {
  RESERVATIONS: "reservations",
} as const;

export const E2E_INCOME_RESERVATION = {
  CUSTOMER_NAME: "Cliente E2E ingresos",
  DURATION_MINUTES: 60,
  PEOPLE_COUNT: 2,
  STARTS_AT: "2030-01-15T15:00:00Z",
  TYPE: "rental",
} as const satisfies {
  CUSTOMER_NAME: string;
  DURATION_MINUTES: number;
  PEOPLE_COUNT: number;
  STARTS_AT: string;
  TYPE: PublicEnums["reservation_type"];
};

export const E2E_INCOME_CHARGE = {
  KIND: "tariff",
  PAYMENT_METHOD: "Efectivo",
} as const satisfies {
  KIND: PublicEnums["charge_kind"];
  PAYMENT_METHOD: string;
};

export const E2E_INCOME_REFUND_REASON = "Devolución E2E";

export const E2E_INCOME_SEEDS = {
  CRC_CHARGE: {
    amount: 25_000,
    currency: CURRENCY_CODE.CRC,
  },
  CRC_REFUND: {
    amount: 40_000,
    currency: CURRENCY_CODE.CRC,
  },
  USD_CHARGE: { amount: 85.5, currency: CURRENCY_CODE.USD },
} as const satisfies Record<string, Money>;

export const E2E_INCOME_ERROR = {
  INSERT_CHARGE: "insert the E2E income charge",
  INSERT_REFUND: "insert the E2E income refund",
  INSERT_RESERVATION: "insert the E2E income reservation",
  READ_MOVEMENTS: "read today's income movements",
  REMOVE: "remove the E2E income movements",
} as const;

export const E2E_INCOME_MONEY_SELECT = "amount, currency";

export const E2E_INCOME_SYMBOL = {
  CRC: "₡",
  USD: "US$",
} as const;

export const E2E_INCOME_SCREENSHOT_BASENAME = {
  REPORT: "01-daily-income-report",
} as const;
