import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationEdit } from "./ReservationEdit.interface";

export interface ReservationEditViewProps {
  categories: ReservationCategoryOption[];
  reservation: ReservationEdit;
}
