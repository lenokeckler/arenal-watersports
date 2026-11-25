import { randomUUID } from "node:crypto";

export const E2E_PRICE_LOOKUP_AMOUNT = {
  COMBO_FOREIGN_USD: 210,
  COMBO_NATIONAL_CRC: 95_000,
  EXTRA_BOTH_CRC: 15_000,
  EXTRA_BOTH_USD: 30,
  EXTRA_FOREIGN_ONLY_USD: 25,
  RENTAL_CRC: 61_000,
  RENTAL_USD: 121,
  TOUR_USD: 81,
} as const;

export const E2E_PRICE_LOOKUP_SCENARIO = {
  ACTIVE_CATEGORY: "categoria",
  ACTIVE_EXTRA: "extra",
  FOREIGN_COMBO: "combo extranjeros",
  FOREIGN_ONLY_EXTRA: "extra dolares",
  INACTIVE_CATEGORY: "categoria inactiva",
  INACTIVE_COMBO: "combo inactivo",
  INACTIVE_EXTRA: "extra inactivo",
  NATIONAL_COMBO: "combo nacionales",
} as const;

export const E2E_PRICE_LOOKUP_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export const E2E_PRICE_LOOKUP_NAME_PREFIX = "Precios E2E";

export const E2E_PRICE_LOOKUP_TOKEN_LENGTH = 8;

export const E2E_PRICE_LOOKUP_COMBO_QUANTITY = 2;

export const E2E_PRICE_LOOKUP_MONEY_PATTERN =
  /cobro|reembolso|devoluci[oó]n|dep[oó]sito/i;

export const E2E_PRICE_LOOKUP_SCREENSHOT_BASENAME = {
  CONTENT: "us-tab-10-price-lookup",
  FORBIDDEN: "us-tab-10-price-lookup-forbidden",
} as const;

export const resolvePriceLookupName = (
  scenario: string,
  projectName: string,
  token: string = randomUUID().slice(
    0,
    E2E_PRICE_LOOKUP_TOKEN_LENGTH
  )
): string =>
  `${E2E_PRICE_LOOKUP_NAME_PREFIX} ${scenario} ${projectName} ${token}`;
