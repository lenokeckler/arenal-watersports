import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import type { ReservationSplitInput } from "../models/ReservationSplitInput.interface";
import { buildReservationSplitDepartureInput } from "./buildReservationSplitDepartureInput";

export const buildReservationSplitInput = (
  split: ReservationSplit,
  state: ReservationSplitDraftsState
): ReservationSplitInput => ({
  departures: state.drafts.map((draft) =>
    buildReservationSplitDepartureInput(
      draft,
      state.unitAssignments
    )
  ),
  expectedUpdatedAt: split.expectedUpdatedAt,
  reservationId: split.id,
});
