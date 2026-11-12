import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import type { ReservationSplitItem } from "../models/ReservationSplitItem.interface";

export const isReservationSplitUnit = (
  item: ReservationSplitItem
): boolean =>
  item.kind === RESERVATION_SPLIT_ITEM_KIND.UNIT;
