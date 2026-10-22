import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationGuideLoadResult } from "./ReservationGuideLoadResult.type";
import type { ReservationPredefinedCombo } from "./ReservationPredefinedCombo.interface";

export interface ReservationFormViewProps {
  categories: ReservationCategoryOption[];
  guideLoadResult: ReservationGuideLoadResult;
  initialDate: string;
  predefinedCombos: ReservationPredefinedCombo[];
}
