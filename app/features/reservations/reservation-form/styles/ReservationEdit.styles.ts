import { BUTTON_PRIMARY_CLASS } from "@/app/components/button/styles/Button.styles";
import {
  RESERVATION_FORM_BACK_CLASS,
  RESERVATION_FORM_FIELD_WIDE_CLASS,
  RESERVATION_FORM_SUBMIT_CLASS,
} from "./ReservationFormView.styles";

export const RESERVATION_EDIT_LAST_EDIT_CLASS =
  "mb-4 break-words text-sm text-on-surface-variant";

export const RESERVATION_EDIT_LOCKED_EQUIPMENT_CLASS = `${RESERVATION_FORM_FIELD_WIDE_CLASS} space-y-3`;

export const RESERVATION_EDIT_LOCKED_EQUIPMENT_LIST_CLASS =
  "rounded-xl bg-surface-container-low/70 p-4 text-base text-on-surface [&_li]:break-words [&_ul]:list-none [&_ul]:space-y-2";

export const RESERVATION_EDIT_SUMMARY_CLASS =
  "mb-4 grid grid-cols-1 gap-3 rounded-xl bg-surface-container-low/70 px-4 py-3 md:grid-cols-2";

export const RESERVATION_EDIT_SUMMARY_LABEL_CLASS =
  "text-sm text-on-surface-variant";

export const RESERVATION_EDIT_SUMMARY_VALUE_CLASS =
  "break-words text-base font-semibold text-on-surface";

export const RESERVATION_EDIT_UNAVAILABLE_ACTION_CLASS = `mt-4 inline-flex items-center justify-center font-semibold ${BUTTON_PRIMARY_CLASS} ${RESERVATION_FORM_SUBMIT_CLASS}`;

export const RESERVATION_EDIT_UNAVAILABLE_BACK_CLASS = `inline-flex w-fit items-center ${RESERVATION_FORM_BACK_CLASS}`;
