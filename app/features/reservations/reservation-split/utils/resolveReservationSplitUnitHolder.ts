import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";

export const resolveReservationSplitUnitHolder = (
  state: ReservationSplitDraftsState,
  itemId: string
): string => {
  const holderIndex = state.drafts.findIndex(
    (draft) => draft.key === state.unitAssignments[itemId]
  );

  return holderIndex < 0
    ? RESERVATION_SPLIT_UI_COPY.UNIT_STAYS
    : RESERVATION_SPLIT_UI_COPY.UNIT_GOES_TO(
        holderIndex +
          RESERVATION_SPLIT_DRAFT.FIRST_NEW_DEPARTURE_NUMBER
      );
};
