import { CUSTOM_COMBO_FORM_INPUT_ID } from "./CustomComboFormCopy.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "../models/CustomComboReservationField.constants";
import { RESERVATION_FORM_FIELD } from "../models/ReservationFormField.constants";
import { RESERVATION_TYPE } from "./ReservationType.constants";

export const RESERVATION_TIME_ZONE = "America/Costa_Rica";

export const RESERVATION_FORM_ACCESS = {
  AREA: "reservas",
  AREA_RPC: "has_area",
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
  extraIds: [] as string[],
  guideIds: [] as string[],
  peopleCount: 1,
  quantity: 1,
  reservationType: RESERVATION_TYPE.RENTAL,
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
  GUIDE_IDS_ERROR: "reservation-guide-ids-error",
  PEOPLE_COUNT: "reservation-people-count",
  QUANTITY: "reservation-quantity",
  RESERVATION_TYPE: "reservation-type",
  SUBMISSION_ERROR: "reservation-submission-error",
  TIME: "reservation-time",
  UNIT: "reservation-unit",
} as const;

export const RESERVATION_FORM_FOCUS_TARGET = {
  TAB_INDEX: -1,
} as const;

export const RESERVATION_FORM_ERROR_TARGET_ID = {
  [RESERVATION_FORM_FIELD.ITEMS]:
    CUSTOM_COMBO_FORM_INPUT_ID.EQUIPMENT_SELECTION_ERROR,
  [CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_CRC]:
    CUSTOM_COMBO_FORM_INPUT_ID.CRC_AMOUNT,
  [CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD]:
    CUSTOM_COMBO_FORM_INPUT_ID.USD_AMOUNT,
  [RESERVATION_FORM_FIELD.GUIDE_IDS]:
    RESERVATION_FORM_FIELD_ID.GUIDE_IDS_ERROR,
  categoryId: RESERVATION_FORM_FIELD_ID.CATEGORY,
  customerName: RESERVATION_FORM_FIELD_ID.CUSTOMER_NAME,
  date: RESERVATION_FORM_FIELD_ID.DATE,
  durationHours: RESERVATION_FORM_FIELD_ID.DURATION_GROUP,
  peopleCount: RESERVATION_FORM_FIELD_ID.PEOPLE_COUNT,
  quantity: RESERVATION_FORM_FIELD_ID.QUANTITY,
  time: RESERVATION_FORM_FIELD_ID.TIME,
  unitId: RESERVATION_FORM_FIELD_ID.UNIT,
} as const;

export const RESERVATION_FORM_ERROR_SCROLL_OPTIONS = {
  block: "center",
} as const;

export const RESERVATION_FORM_INPUT_TYPE = {
  RADIO: "radio",
} as const;

export const RESERVATION_FORM_CATEGORY_IMAGE_SIZE = {
  HEIGHT: 128,
  WIDTH: 192,
} as const;
