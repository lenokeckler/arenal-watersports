import type { ReservationSplitDraft } from "./ReservationSplitDraft.interface";
import type { ReservationSplitUnitAssignments } from "./ReservationSplitUnitAssignments.type";

export interface ReservationSplitDraftsState {
  drafts: ReservationSplitDraft[];
  unitAssignments: ReservationSplitUnitAssignments;
}
