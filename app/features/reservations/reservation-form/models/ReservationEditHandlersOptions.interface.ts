import type { ReservationEdit } from "./ReservationEdit.interface";
import type { ReservationEditEquipmentState } from "./ReservationEditEquipmentState.type";
import type { ReservationEditFormState } from "./ReservationEditFormState.type";

export interface ReservationEditHandlersOptions {
  equipment: ReservationEditEquipmentState;
  form: ReservationEditFormState;
  reservation: ReservationEdit;
}
