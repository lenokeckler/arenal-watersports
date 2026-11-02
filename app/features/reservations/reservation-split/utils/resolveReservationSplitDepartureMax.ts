import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import type { ReservationSplitDepartureMax } from "../models/ReservationSplitDepartureMax.interface";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";
import type { ReservationSplitRemainder } from "../models/ReservationSplitRemainder.interface";

const resolveGiveable = (
  available: number,
  minimumKept: number
): number =>
  Math.max(
    available - minimumKept,
    RESERVATION_SPLIT_DRAFT.NONE
  );

export const resolveReservationSplitDepartureMax = (
  draft: ReservationSplitDraft,
  remainder: ReservationSplitRemainder
): ReservationSplitDepartureMax => {
  const giveablePieces = resolveGiveable(
    remainder.pieces,
    RESERVATION_SPLIT_DRAFT.MIN_PIECES
  );

  return {
    peopleCount:
      draft.peopleCount +
      resolveGiveable(
        remainder.peopleCount,
        RESERVATION_SPLIT_DRAFT.MIN_PEOPLE
      ),
    quantities: Object.fromEntries(
      Object.entries(draft.quantities).map(
        ([itemId, quantity]) => [
          itemId,
          quantity +
            Math.min(
              remainder.items[itemId],
              giveablePieces
            ),
        ]
      )
    ),
  };
};
