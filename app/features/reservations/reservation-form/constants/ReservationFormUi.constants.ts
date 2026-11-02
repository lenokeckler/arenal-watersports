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

export const RESERVATION_CUSTOM_DURATION_INITIAL_HOURS = 0;

export const RESERVATION_FORM_MINIMUM_INPUT_VALUE = 0;

export const RESERVATION_FORM_DEFAULT_VALUES = {
  categoryId: "",
  customerName: "",
  date: "",
  durationHours: 1,
  peopleCount: 1,
  quantity: 1,
  time: "09:00",
  unitId: "",
} as const;

export const RESERVATION_FORM_FIELD_ID = {
  CATEGORY: "reservation-category",
  CATEGORY_ERROR: "reservation-category-error",
  CUSTOMER_NAME: "reservation-customer-name",
  DATE: "reservation-date",
  DURATION: "reservation-duration",
  DURATION_ERROR: "reservation-duration-error",
  DURATION_GROUP: "reservation-duration-group",
  HEADING: "reservation-form-heading",
  PEOPLE_COUNT: "reservation-people-count",
  QUANTITY: "reservation-quantity",
  SUBMISSION_ERROR: "reservation-submission-error",
  TIME: "reservation-time",
  UNIT: "reservation-unit",
} as const;

export const RESERVATION_FORM_FOCUS_TARGET = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_FORM_ERROR_TARGET_ID = {
  categoryId: RESERVATION_FORM_FIELD_ID.CATEGORY,
  customerName: RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME,
  date: RESERVATION_FORM_FIELD_ID.DATE,
  durationHours: RESERVATION_FORM_FIELD_ID.DURATION_GROUP,
  peopleCount: RESERVATION_FORM_FIELD_ID.PEOPLE_COUNT,
  quantity: RESERVATION_FORM_FIELD_ID.QUANTITY,
  time: RESERVATION_FORM_FIELD_ID.TIME,
  unitId: RESERVATION_FORM_FIELD_ID.UNIT,
} as const;

export const RESERVATION_FORM_INPUT_TYPE = {
  RADIO: "radio",
} as const;

export const RESERVATION_FORM_CATEGORY_IMAGE_SIZE = {
  HEIGHT: 128,
  WIDTH: 192,
} as const;
