import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface CreatePredefinedComboReservationInputOptions {
  comboId: string;
  durationHours: number;
  values: ReservationFormInput;
}
