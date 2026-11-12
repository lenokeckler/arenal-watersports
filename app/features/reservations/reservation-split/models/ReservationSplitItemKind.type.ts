import type { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";

export type ReservationSplitItemKind =
  (typeof RESERVATION_SPLIT_ITEM_KIND)[keyof typeof RESERVATION_SPLIT_ITEM_KIND];
