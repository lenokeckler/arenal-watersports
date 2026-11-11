import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationUnitCategoryOption } from "./ReservationUnitCategoryOption.interface";
import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";

export interface ReservationFormViewProps {
  categories: ReservationCategoryOption[];
  unitCategories: ReservationUnitCategoryOption[];
  initialDate: string;
  guideLoadResult: ReservationGuideLoadResult;
}
