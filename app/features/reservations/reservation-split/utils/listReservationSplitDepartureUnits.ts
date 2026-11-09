import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";

export const listReservationSplitDepartureUnits = (
  split: ReservationSplit,
  state: ReservationSplitDraftsState,
  departureKey: string
): string[] =>
  split.items
    .filter(
      (item) =>
        item.kind === RESERVATION_SPLIT_ITEM_KIND.UNIT &&
        state.unitAssignments[item.id] === departureKey
    )
    .map((item) => item.label);
