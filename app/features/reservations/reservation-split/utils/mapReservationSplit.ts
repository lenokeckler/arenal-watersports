import {
  RESERVATION_CALENDAR_ACTIVE_STATUS,
  STRING,
} from "@/app/constants";
import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { RESERVATION_SPLIT_BLOCK } from "../constants/ReservationSplitBlock.constants";
import { RESERVATION_SPLIT_ITEM_KIND } from "../constants/ReservationSplitItemKind.constants";
import { RESERVATION_SPLIT_LIMITS } from "../constants/ReservationSplitLimits.constants";
import type { ReservationSplit } from "../models/ReservationSplit.interface";
import type { ReservationSplitBlock } from "../models/ReservationSplitBlock.type";
import type { ReservationSplitItem } from "../models/ReservationSplitItem.interface";
import type { ReservationSplitItemRow } from "../models/ReservationSplitItemRow.interface";
import type { ReservationSplitRow } from "../models/ReservationSplitRow.interface";

const isMovableItemRow = (
  item: ReservationSplitItemRow
): boolean =>
  item.extra_id === null &&
  item.dispatch_id === null &&
  (item.unit_id !== null || item.category_id !== null);

const mapUnitItem = (
  item: ReservationSplitItemRow
): ReservationSplitItem => {
  const categoryName = safeString(
    item.unit?.category?.name
  );
  return {
    categoryName,
    id: item.id,
    kind: RESERVATION_SPLIT_ITEM_KIND.UNIT,
    label: [categoryName, safeString(item.unit?.code)].join(
      STRING.SPACE
    ),
    pieces: RESERVATION_SPLIT_LIMITS.UNIT_PIECES,
  };
};

const mapQuantityItem = (
  item: ReservationSplitItemRow
): ReservationSplitItem => {
  const categoryName = safeString(item.category?.name);
  return {
    categoryName,
    id: item.id,
    kind: RESERVATION_SPLIT_ITEM_KIND.QUANTITY,
    label: categoryName,
    pieces:
      item.quantity ?? RESERVATION_SPLIT_LIMITS.UNIT_PIECES,
  };
};

const mapItem = (
  item: ReservationSplitItemRow
): ReservationSplitItem =>
  item.unit_id === null
    ? mapQuantityItem(item)
    : mapUnitItem(item);

const resolveSplitBlock = (
  row: ReservationSplitRow,
  items: ReservationSplitItem[]
): ReservationSplitBlock => {
  const totalPieces = items.reduce(
    (total, item) => total + item.pieces,
    0
  );
  if (
    row.status !==
    RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED
  ) {
    return RESERVATION_SPLIT_BLOCK.NOT_SCHEDULED;
  }
  if (
    row.people_count <
    RESERVATION_SPLIT_LIMITS.MIN_PEOPLE_TO_SPLIT
  ) {
    return RESERVATION_SPLIT_BLOCK.TOO_FEW_PEOPLE;
  }
  if (
    totalPieces <
    RESERVATION_SPLIT_LIMITS.MIN_PIECES_TO_SPLIT
  ) {
    return RESERVATION_SPLIT_BLOCK.TOO_LITTLE_EQUIPMENT;
  }
  return RESERVATION_SPLIT_BLOCK.NONE;
};

export const mapReservationSplit = (
  row: ReservationSplitRow
): ReservationSplit => {
  const startsAt = new Date(row.starts_at);
  const items = row.reservation_items
    .filter(isMovableItemRow)
    .map(mapItem)
    .sort((left, right) => left.id.localeCompare(right.id));

  return {
    code: row.code,
    customerName: row.customer_name,
    date: getCostaRicaDayRange(startsAt).date,
    durationMinutes: row.duration_minutes,
    expectedUpdatedAt: row.updated_at,
    id: row.id,
    items,
    peopleCount: row.people_count,
    splitBlock: resolveSplitBlock(row, items),
    time: getCostaRicaTime(startsAt),
  };
};
