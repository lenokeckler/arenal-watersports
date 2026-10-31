import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationUnitCategoryOption } from "./ReservationUnitCategoryOption.interface";

export interface ReservationFormViewModelOptions {
  categories: ReservationCategoryOption[];
  initialCategoryId: string;
  initialDate: string;
  unitCategories: ReservationUnitCategoryOption[];
}
