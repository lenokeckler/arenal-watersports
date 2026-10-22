export const PREDEFINED_COMBO_RESERVATION_FIELD = {
  COMBO_ID: "comboId",
  CUSTOMER_NAME: "customerName",
  DATE: "date",
  DURATION_HOURS: "durationHours",
  PEOPLE_COUNT: "peopleCount",
  TIME: "time",
} as const;

export type PredefinedComboReservationField =
  (typeof PREDEFINED_COMBO_RESERVATION_FIELD)[keyof typeof PREDEFINED_COMBO_RESERVATION_FIELD];
