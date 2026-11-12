import type { CustomComboReservationDraft } from "./CustomComboReservationDraft.interface";

export interface CustomComboReservationSubmission {
  draft: CustomComboReservationDraft;
  hasGuideOnlyItem: boolean;
}
