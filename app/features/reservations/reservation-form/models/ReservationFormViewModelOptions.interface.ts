import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationUnitCategoryOption } from "./ReservationUnitCategoryOption.interface";
import type { ReservationGuideOption } from "./ReservationGuideOption.interface";

export interface ReservationFormViewModelOptions {
  categories: ReservationCategoryOption[];
  initialCategoryId: string;
  initialDate: string;
  guideOptions?: ReservationGuideOption[];
  unitCategories: ReservationUnitCategoryOption[];
}
