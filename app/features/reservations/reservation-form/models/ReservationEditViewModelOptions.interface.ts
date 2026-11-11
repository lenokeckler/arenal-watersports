import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationEdit } from "./ReservationEdit.interface";

export interface ReservationEditViewModelOptions {
  categories: ReservationCategoryOption[];
  reservation: ReservationEdit;
}
