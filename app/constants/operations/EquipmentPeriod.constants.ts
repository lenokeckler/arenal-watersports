export const EQUIPMENT_PERIOD = {
  HISTORY_MONTHS: 6,
  MONTH_KEY_LENGTH: 7,
  NOON_SUFFIX: "T12:00:00Z",
  LOCALE: "es-CR",
  FIRST_DAY_SUFFIX: "-01",
} as const;

export const EQUIPMENT_CURRENCIES = ["CRC", "USD"] as const;

export const EQUIPMENT_CURRENCY_LABELS = {
  CRC: "Colones ₡",
  USD: "Dólares US$",
} as const;
