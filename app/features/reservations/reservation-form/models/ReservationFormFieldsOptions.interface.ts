import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationFormFieldsOptions {
  initialValues?: ReservationFormInput;
  keepsUnitOnScheduleChange?: boolean;
}
