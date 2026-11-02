import { STRING } from "@/app/constants";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitDraft } from "../models/ReservationSplitDraft.interface";

export const buildReservationSplitDraft = (
  split: ReservationSplit,
  key: string
): ReservationSplitDraft => ({
  key,
  peopleCount: RESERVATION_SPLIT_DRAFT.MIN_PEOPLE,
  quantities: Object.fromEntries(
    split.items
      .filter(
        (item) =>
          item.kind === RESERVATION_SPLIT_ITEM_KIND.QUANTITY
      )
      .map((item) => [
        item.id,
        RESERVATION_SPLIT_DRAFT.NONE,
      ])
  ),
  time: STRING.Empty,
});
