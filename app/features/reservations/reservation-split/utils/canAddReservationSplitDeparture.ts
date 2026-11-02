import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import type { ReservationSplitRemainder } from "../models/ReservationSplitRemainder.interface";

export const canAddReservationSplitDeparture = (
  remainder: ReservationSplitRemainder
): boolean =>
  remainder.peopleCount -
    RESERVATION_SPLIT_DRAFT.INITIAL_PEOPLE_COUNT >=
    RESERVATION_SPLIT_DRAFT.MIN_REMAINING_PEOPLE &&
  remainder.pieces -
    RESERVATION_SPLIT_DRAFT.NEW_DEPARTURE_MIN_PIECES >=
    RESERVATION_SPLIT_DRAFT.MIN_REMAINING_PIECES;
