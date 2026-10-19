import type { ReservationFormField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export type ReservationFormValueUpdater = <
  Field extends ReservationFormField,
>(
  field: Field,
  value: ReservationFormInput[Field]
) => void;
