import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface ReservationEditFormStart {
  customDurationDraft: string;
  values: ReservationFormInput;
}
