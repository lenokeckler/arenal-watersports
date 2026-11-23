export const RESERVATION_DETAIL_ACCESS = {
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
  EXTRA_TIME: "load reservation extra time",
  LOAD: "load reservation detail",
} as const;

export type ReservationDetailChargeStatus =
  (typeof RESERVATION_DETAIL_CHARGE_STATUS)[keyof typeof RESERVATION_DETAIL_CHARGE_STATUS];

export type ReservationDetailCurrency =
  (typeof RESERVATION_DETAIL_CURRENCY)[keyof typeof RESERVATION_DETAIL_CURRENCY];

export const RESERVATION_DETAIL_MOVEMENT_TYPE = {
  CHARGE: "charge",
  REFUND: "refund",
} as const;

export type ReservationDetailMovementType =
  (typeof RESERVATION_DETAIL_MOVEMENT_TYPE)[keyof typeof RESERVATION_DETAIL_MOVEMENT_TYPE];

export const RESERVATION_DETAIL_EXTRA_TIME_OUTCOME = {
  CHARGED: "charged",
  COURTESY: "courtesy",
} as const;

export type ReservationDetailExtraTimeOutcome =
  (typeof RESERVATION_DETAIL_EXTRA_TIME_OUTCOME)[keyof typeof RESERVATION_DETAIL_EXTRA_TIME_OUTCOME];

export const RESERVATION_DETAIL_EXTRA_TIME_STATE = {
  ...RESERVATION_DETAIL_EXTRA_TIME_OUTCOME,
  PENDING: "pending",
} as const;

export type ReservationDetailExtraTimeState =
  (typeof RESERVATION_DETAIL_EXTRA_TIME_STATE)[keyof typeof RESERVATION_DETAIL_EXTRA_TIME_STATE];

export const RESERVATION_DETAIL_NO_EXTRA_MINUTES = 0;
