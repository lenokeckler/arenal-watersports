export const RESERVATION_TIME_ZONE = "America/Costa_Rica";

export const RESERVATION_FORM_ACCESS = {
  AREA: "reservas",
  AREA_RPC: "has_area",
  ADMIN_RPC: "is_admin",
} as const;

export const RESERVATION_DURATION_PRESETS = [
  { hours: 0.5, label: "30 min" },
  { hours: 1, label: "1 h" },
  { hours: 1.5, label: "1 h 30" },
  { hours: 2, label: "2 h" },
  { hours: 3, label: "3 h" },
] as const;

export const RESERVATION_FORM_DEFAULT_VALUES = {
  categoryId: "",
  customerName: "",
  date: "",
  durationHours: 1,
  peopleCount: 1,
  quantity: 1,
  time: "09:00",
} as const;

export const RESERVATION_FORM_FIELD_ID = {
  CATEGORY: "reservation-category",
  CUSTOMER_NAME: "reservation-customer-name",
  DATE: "reservation-date",
  DURATION: "reservation-duration",
  HEADING: "reservation-form-heading",
  PEOPLE_COUNT: "reservation-people-count",
  QUANTITY: "reservation-quantity",
  TIME: "reservation-time",
} as const;
