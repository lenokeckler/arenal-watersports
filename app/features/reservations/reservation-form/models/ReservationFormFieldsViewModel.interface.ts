import type { ReservationFormInput } from "./ReservationFormInput.interface";
import type { ReservationFormFieldHandlers } from "./ReservationFormFieldHandlers.interface";

export interface ReservationFormFieldsViewModel extends ReservationFormFieldHandlers {
  values: ReservationFormInput;
}
