export const RESERVATION_FORM_FIELD = {
  CATEGORY_ID: "categoryId",
  CUSTOMER_NAME: "customerName",
  DATE: "date",
  DURATION_HOURS: "durationHours",
  PEOPLE_COUNT: "peopleCount",
  QUANTITY: "quantity",
  TIME: "time",
} as const;

export type ReservationFormField =
  (typeof RESERVATION_FORM_FIELD)[keyof typeof RESERVATION_FORM_FIELD];
