import type {
  NullableRef,
  NullableUndefined,
} from "@/app/types";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_FEEDBACK_COPY } from "../constants/ReservationSplitFeedbackCopy.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import type { ReservationSplitErrors } from "../models/ReservationSplitErrors.interface";
import type { ReservationSplitRemainder } from "../models/ReservationSplitRemainder.interface";
import { buildReservationSplitDepartureInput } from "./buildReservationSplitDepartureInput";
import { hasReservationSplitErrors } from "./hasReservationSplitErrors";
import { resolveReservationSplitRemainder } from "./resolveReservationSplitRemainder";
import { validateReservationSplitDeparture } from "./validateReservationSplitInput";

const resolveOriginalError = (
  remainder: ReservationSplitRemainder
): NullableUndefined<string> => {
  if (
    remainder.peopleCount <
    RESERVATION_SPLIT_DRAFT.MIN_PEOPLE
  ) {
    return RESERVATION_SPLIT_FEEDBACK_COPY.ORIGINAL_PEOPLE_MIN;
  }
  return remainder.pieces <
    RESERVATION_SPLIT_DRAFT.MIN_PIECES
    ? RESERVATION_SPLIT_FEEDBACK_COPY.ORIGINAL_EQUIPMENT_MIN
    : undefined;
};

export const validateReservationSplitDrafts = (
  split: ReservationSplit,
  state: ReservationSplitDraftsState
): NullableRef<ReservationSplitErrors> => {
  const departures = state.drafts.map((draft) =>
    validateReservationSplitDeparture(
      buildReservationSplitDepartureInput(
        draft,
        state.unitAssignments
      )
    )
  );
  const original = resolveOriginalError(
    resolveReservationSplitRemainder(split, state)
  );
  const hasDepartureErrors = departures.some(
    hasReservationSplitErrors
  );

  return original || hasDepartureErrors
    ? { departures, original }
    : null;
};
