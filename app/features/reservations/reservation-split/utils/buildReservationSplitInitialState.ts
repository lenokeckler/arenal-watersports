import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDraftsState } from "../models/ReservationSplitDraftsState.interface";
import { buildReservationSplitDraft } from "./buildReservationSplitDraft";

export const buildReservationSplitInitialState = (
  split: ReservationSplit,
  key: string
): ReservationSplitDraftsState => ({
  drafts: [buildReservationSplitDraft(split, key)],
  unitAssignments: Object.fromEntries(
    split.items
      .filter(
        (item) =>
          item.kind === RESERVATION_SPLIT_ITEM_KIND.UNIT
      )
      .map((item) => [item.id, null])
  ),
});
