import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationFormValueField } from "./ReservationFormValueField.type";

export type ReservationFormValueUpdater = <
  Field extends ReservationFormValueField,
>(
  field: Field,
  value: ReservationFormInput[Field]
) => void;
