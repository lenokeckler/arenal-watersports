import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationFormErrorField } from "./ReservationFormField.constants";
import type { ReservationType } from "./ReservationType.type";

export interface CustomComboFormOptions {
  categories: ReservationCategoryOption[];
  clearFieldError: (
    field: ReservationFormErrorField
  ) => void;
  durationHours: number;
  date?: string;
  onGuideIdsChange: (guideIds: string[]) => void;
  reservationType: ReservationType;
  time?: string;
}
