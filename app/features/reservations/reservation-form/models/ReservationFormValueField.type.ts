import { RESERVATION_FORM_FIELD } from "./ReservationFormField.constants";
import type { ReservationFormField } from "./ReservationFormField.constants";

export type ReservationFormValueField = Exclude<
  ReservationFormField,
  typeof RESERVATION_FORM_FIELD.ITEMS
>;
