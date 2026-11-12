import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import type { ReservationSplitRemainder } from "../models/ReservationSplitRemainder.interface";
import { buildReservationSplitDepartureInput } from "./buildReservationSplitDepartureInput";

export const canAddReservationSplitDeparture = (
  remainder: ReservationSplitRemainder,
  state: ReservationSplitDraftsState
): boolean => {
  const emptyDrafts = state.drafts.filter(
    (draft) =>
      buildReservationSplitDepartureInput(
        draft,
        state.unitAssignments
      ).items.length === RESERVATION_SPLIT_DRAFT.NONE
  ).length;

  return (
    remainder.peopleCount >
      RESERVATION_SPLIT_DRAFT.MIN_PEOPLE &&
    remainder.pieces -
      emptyDrafts * RESERVATION_SPLIT_DRAFT.MIN_PIECES >
      RESERVATION_SPLIT_DRAFT.MIN_PIECES
  );
};
