import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationFormValuesProps } from "./ReservationFormValuesProps.interface";

export interface ReservationFormCardProps extends ReservationFormValuesProps {
  categories: ReservationCategoryOption[];
}
