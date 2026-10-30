import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";

export interface ReservationFormViewProps {
  categories: ReservationCategoryOption[];
  initialDate: string;
}
