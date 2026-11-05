import type { ReservationFormErrorField } from "./ReservationFormField.constants";
import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { CustomComboReservationInput } from "./CustomComboReservationInput.interface";
import type { ReservationType } from "./ReservationType.type";

export interface ReservationFormCustomComboViewModelOptions {
  categories: ReservationCategoryOption[];
  clearFieldError: (
    field: ReservationFormErrorField
  ) => void;
  durationHours: number;
  onGuideIdsChange: (guideIds: string[]) => void;
  reservationType: ReservationType;
  requiresConcreteUnit: boolean;
  setFieldError: (
    field: ReservationFormErrorField,
    message: string
  ) => void;
  submitCustomComboReservation: (
    input: CustomComboReservationInput
  ) => void;
  submitReservation: (input: ReservationFormInput) => void;
  values: ReservationFormInput;
}
