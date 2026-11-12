import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationEdit } from "./ReservationEdit.interface";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationEditEquipmentOptions {
  categories: ReservationCategoryOption[];
  durationHours: number;
  reservation: ReservationEdit;
  values: ReservationFormInput;
}
