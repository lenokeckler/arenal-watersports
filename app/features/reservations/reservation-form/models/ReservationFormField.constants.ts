export const RESERVATION_FORM_FIELD = {
  CATEGORY_ID: "categoryId",
  CUSTOMER_NAME: "customerName",
  DATE: "date",
  DURATION_HOURS: "durationHours",
  GUIDE_IDS: "guideIds",
  PEOPLE_COUNT: "peopleCount",
  QUANTITY: "quantity",
  RESERVATION_TYPE: "reservationType",
  TIME: "time",
  UNIT_ID: "unitId",
} as const;

export type ReservationFormField =
  (typeof RESERVATION_FORM_FIELD)[keyof typeof RESERVATION_FORM_FIELD];
