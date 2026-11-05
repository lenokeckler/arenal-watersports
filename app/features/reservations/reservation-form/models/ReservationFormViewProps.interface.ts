import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationGuideOption } from "./ReservationGuideOption.interface";

export interface ReservationFormViewProps {
  categories: ReservationCategoryOption[];
  guideOptions: ReservationGuideOption[];
  initialDate: string;
}
