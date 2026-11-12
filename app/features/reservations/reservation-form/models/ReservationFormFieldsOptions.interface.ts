import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationGuideOption } from "./ReservationGuideOption.interface";

export interface ReservationFormFieldsOptions {
  initialValues?: ReservationFormInput;
  guideOptions?: ReservationGuideOption[];
  keepsUnitOnScheduleChange?: boolean;
  liveCategories?: ReservationCategoryOption[];
}
