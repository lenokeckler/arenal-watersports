import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import type { ReservationSplitItem } from "../models/ReservationSplitItem.interface";
import type { ReservationSplitRemainder } from "../models/ReservationSplitRemainder.interface";

const sum = (values: number[]): number =>
  values.reduce(
    (total, value) => total + value,
    RESERVATION_SPLIT_DRAFT.NONE
  );

const resolveItemRemainder = (
  item: ReservationSplitItem,
  state: ReservationSplitDraftsState
): number => {
  if (item.kind === RESERVATION_SPLIT_ITEM_KIND.UNIT) {
    return state.unitAssignments[item.id] === null
      ? item.pieces
      : RESERVATION_SPLIT_DRAFT.NONE;
  }
  return (
    item.pieces -
    sum(
      state.drafts.map(
        (draft) =>
          draft.quantities[item.id] ??
          RESERVATION_SPLIT_DRAFT.NONE
      )
    )
  );
};

export const resolveReservationSplitRemainder = (
  split: ReservationSplit,
  state: ReservationSplitDraftsState
): ReservationSplitRemainder => {
  const items = Object.fromEntries(
    split.items.map((item) => [
      item.id,
      resolveItemRemainder(item, state),
    ])
  );

  return {
    items,
    peopleCount:
      split.peopleCount -
      sum(state.drafts.map((draft) => draft.peopleCount)),
    pieces: sum(Object.values(items)),
  };
};
