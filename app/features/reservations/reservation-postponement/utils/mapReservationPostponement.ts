import {
  RESERVATION_CALENDAR_ACTIVE_STATUS,
  STRING,
} from "@/app/constants";
import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import { RESERVATION_POSTPONEMENT_BLOCK } from "../constants/ReservationPostponementBlock.constants";
import type { ReservationPostponement } from "../models/ReservationPostponement.interface";
import type { ReservationPostponementBlock } from "../models/ReservationPostponementBlock.type";
import type { ReservationPostponementEquipmentLine } from "../models/ReservationPostponementEquipmentLine.interface";
import type { ReservationPostponementItemRow } from "../models/ReservationPostponementItemRow.interface";
import type { ReservationPostponementReadingUnit } from "../models/ReservationPostponementReadingUnit.interface";
import type { ReservationPostponementRow } from "../models/ReservationPostponementRow.interface";
import type { ReservationPostponementStatus } from "../models/ReservationPostponementStatus.type";

const isEquipmentRow = (
  item: ReservationPostponementItemRow
): boolean =>
  item.extra_id === null &&
  (item.unit_id !== null || item.category_id !== null);

const isOpenDispatchedUnitRow = (
  item: ReservationPostponementItemRow
): boolean =>
  item.dispatch_id !== null &&
  item.unit_id !== null &&
  item.dispatch?.closed_at === null;

const compareById = (
  left: { id: string },
  right: { id: string }
): number => left.id.localeCompare(right.id);

const mapEquipmentLine = (
  item: ReservationPostponementItemRow
): ReservationPostponementEquipmentLine => {
  if (item.unit_id === null) {
    return {
      id: item.id,
      label: safeString(item.category?.name),
      quantity: item.quantity,
    };
  }
  return {
    id: item.id,
    label: [
      safeString(item.unit?.category?.name),
      safeString(item.unit?.code),
    ].join(STRING.SPACE),
    quantity: null,
  };
};

const mapReadingUnit = (
  item: ReservationPostponementItemRow
): ReservationPostponementReadingUnit => {
  const category = item.unit?.category ?? null;
  const usageMetric = category?.usage_metric ?? null;
  const consumesFuel = category?.consumes_fuel === true;

  return {
    categoryName: safeString(category?.name),
    fuelMax: consumesFuel
      ? (item.unit?.fuel_max ?? null)
      : null,
    fuelOut: consumesFuel ? item.fuel_out : null,
    itemId: item.id,
    unitCode: safeString(item.unit?.code),
    usageMetric,
    usageOut: usageMetric === null ? null : item.usage_out,
  };
};

const resolveBlock = (
  status: ReservationPostponementStatus
): ReservationPostponementBlock =>
  status === RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED ||
  status === RESERVATION_CALENDAR_ACTIVE_STATUS.DISPATCHED
    ? RESERVATION_POSTPONEMENT_BLOCK.NONE
    : RESERVATION_POSTPONEMENT_BLOCK.NOT_POSTPONABLE;

export const mapReservationPostponement = (
  row: ReservationPostponementRow
): ReservationPostponement => {
  const startsAt = new Date(row.starts_at);
  const items = [...row.reservation_items].sort(
    compareById
  );

  return {
    block: resolveBlock(row.status),
    code: row.code,
    customerName: row.customer_name,
    date: getCostaRicaDayRange(startsAt).date,
    durationMinutes: row.duration_minutes,
    equipment: items
      .filter(isEquipmentRow)
      .map(mapEquipmentLine),
    expectedUpdatedAt: row.updated_at,
    id: row.id,
    isDispatched:
      row.status ===
      RESERVATION_CALENDAR_ACTIVE_STATUS.DISPATCHED,
    readingUnits: items
      .filter(isOpenDispatchedUnitRow)
      .map(mapReadingUnit),
    status: row.status,
    time: getCostaRicaTime(startsAt),
  };
};
