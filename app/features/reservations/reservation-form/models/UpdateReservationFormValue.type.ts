import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationFormField } from "./ReservationFormField.constants";

export type UpdateReservationFormValue = <
  Field extends ReservationFormField,
>(
  field: Field,
  value: ReservationFormInput[Field]
) => void;
