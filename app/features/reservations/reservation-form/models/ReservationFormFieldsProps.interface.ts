import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationFormValuesProps } from "./ReservationFormValuesProps.interface";

export interface ReservationFormFieldsProps extends ReservationFormValuesProps {
  categories: ReservationCategoryOption[];
}
