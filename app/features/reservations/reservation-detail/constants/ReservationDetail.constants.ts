export const RESERVATION_DETAIL_ACCESS = {
  ADMIN_RPC: "is_admin",
  AREA: "reservas",
  AREA_RPC: "has_area",
} as const;

export const RESERVATION_DETAIL_UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const RESERVATION_DETAIL_CHARGE_STATUS = {
  PAID: "paid",
  PARENT: "parent",
  PARTIAL: "partial",
  PENDING: "pending",
  UNPRICED: "unpriced",
} as const;

export const RESERVATION_DETAIL_CHARGE_KIND = {
  EXTRA_TIME: "extra_time",
  TARIFF: "tariff",
} as const;

export const RESERVATION_DETAIL_CURRENCY = {
  CRC: "CRC",
  USD: "USD",
} as const;

export const RESERVATION_DETAIL_CURRENCIES = [
  RESERVATION_DETAIL_CURRENCY.CRC,
  RESERVATION_DETAIL_CURRENCY.USD,
] as const;

export const RESERVATION_DETAIL_MINOR_UNITS_PER_MAJOR = 100;
export const RESERVATION_DETAIL_ZERO_MINOR_UNITS = 0;

export const RESERVATION_DETAIL_OPERATION = {
  ACCESS: "check reservation detail access",
  LOAD: "load reservation detail",
} as const;

export type ReservationDetailChargeStatus =
  (typeof RESERVATION_DETAIL_CHARGE_STATUS)[keyof typeof RESERVATION_DETAIL_CHARGE_STATUS];

export type ReservationDetailCurrency =
  (typeof RESERVATION_DETAIL_CURRENCY)[keyof typeof RESERVATION_DETAIL_CURRENCY];
