import type { ReservationEdit } from "./ReservationEdit.interface";
import type { ReservationFormFieldsProps } from "./ReservationFormFieldsProps.interface";

export interface ReservationEditFieldsProps extends ReservationFormFieldsProps {
  reservation: ReservationEdit;
}
