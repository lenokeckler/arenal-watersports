import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";

export interface ReservationFormViewProps {
  categories: ReservationCategoryOption[];
  guideLoadResult: ReservationGuideLoadResult;
  initialDate: string;
}
