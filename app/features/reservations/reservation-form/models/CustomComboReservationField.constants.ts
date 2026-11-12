export const CUSTOM_COMBO_RESERVATION_FIELD = {
  AGREED_AMOUNT_CRC: "agreedAmountCrc",
  AGREED_AMOUNT_USD: "agreedAmountUsd",
  CUSTOMER_NAME: "customerName",
  DATE: "date",
  DURATION_HOURS: "durationHours",
  GUIDE_IDS: "guideIds",
  ITEMS: "items",
  PEOPLE_COUNT: "peopleCount",
  TIME: "time",
} as const;

export type CustomComboReservationField =
  (typeof CUSTOM_COMBO_RESERVATION_FIELD)[keyof typeof CUSTOM_COMBO_RESERVATION_FIELD];
