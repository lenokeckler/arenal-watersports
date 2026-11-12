import type { CustomComboReservationDraft } from "./CustomComboReservationDraft.interface";
import type { ReservationFormInput } from "./ReservationFormInput.interface";

export interface CreateCustomComboReservationInputOptions {
  draft: CustomComboReservationDraft;
  durationHours: number;
  hasGuideOnlyItem: boolean;
  values: ReservationFormInput;
}
