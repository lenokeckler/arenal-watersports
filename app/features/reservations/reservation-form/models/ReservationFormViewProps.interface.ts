import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationUnitCategoryOption } from "./ReservationUnitCategoryOption.interface";

export interface ReservationFormViewProps {
  categories: ReservationCategoryOption[];
  unitCategories: ReservationUnitCategoryOption[];
  initialDate: string;
}
