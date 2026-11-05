export const CUSTOM_COMBO_RESERVATION_FIELD = {
  CUSTOMER_NAME: "customerName",
  DATE: "date",
  DURATION_HOURS: "durationHours",
  ITEMS: "items",
  PEOPLE_COUNT: "peopleCount",
  TIME: "time",
} as const;

export type CustomComboReservationField =
  (typeof CUSTOM_COMBO_RESERVATION_FIELD)[keyof typeof CUSTOM_COMBO_RESERVATION_FIELD];
