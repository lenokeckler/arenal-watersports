import type { CustomComboReservationField } from "./CustomComboReservationField.constants";
import { CUSTOM_COMBO_RESERVATION_FIELD } from "./CustomComboReservationField.constants";

export const RESERVATION_FORM_FIELD = {
  CATEGORY_ID: "categoryId",
  CUSTOMER_NAME: "customerName",
  DATE: "date",
  DURATION_HOURS: "durationHours",
  EXTRA_IDS: "extraIds",
  GUIDE_IDS: "guideIds",
  ITEMS: "items",
  PEOPLE_COUNT: "peopleCount",
  QUANTITY: "quantity",
  RESERVATION_TYPE: "reservationType",
  TIME: "time",
  UNIT_ID: "unitId",
} as const;

export const RESERVATION_FORM_ERROR_FOCUS_ORDER = [
  RESERVATION_FORM_FIELD.ITEMS,
  CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_CRC,
  CUSTOM_COMBO_RESERVATION_FIELD.AGREED_AMOUNT_USD,
  RESERVATION_FORM_FIELD.CUSTOMER_NAME,
  RESERVATION_FORM_FIELD.PEOPLE_COUNT,
  RESERVATION_FORM_FIELD.DATE,
  RESERVATION_FORM_FIELD.GUIDE_IDS,
  RESERVATION_FORM_FIELD.TIME,
  RESERVATION_FORM_FIELD.DURATION_HOURS,
  RESERVATION_FORM_FIELD.CATEGORY_ID,
  RESERVATION_FORM_FIELD.QUANTITY,
  RESERVATION_FORM_FIELD.UNIT_ID,
] as const;

export type ReservationFormField =
  (typeof RESERVATION_FORM_FIELD)[keyof typeof RESERVATION_FORM_FIELD];

export type ReservationFormErrorField =
  ReservationFormField | CustomComboReservationField;
