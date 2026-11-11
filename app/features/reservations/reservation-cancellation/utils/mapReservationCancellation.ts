import {
  RESERVATION_CALENDAR_ACTIVE_STATUS,
  STRING,
} from "@/app/constants";
import { getCostaRicaDayRange } from "@/app/utils/costa-rica-day/getCostaRicaDayRange";
import { getCostaRicaTime } from "@/app/utils/costa-rica-day/getCostaRicaTime";
import { safeString } from "@/app/utils/safe-value/SafeValue";
import type { ReservationCancellation } from "../models/ReservationCancellation.interface";
import type { ReservationCancellationEquipmentLine } from "../models/ReservationCancellationEquipmentLine.interface";
import type { ReservationCancellationItemRow } from "../models/ReservationCancellationItemRow.interface";
import type { ReservationCancellationRow } from "../models/ReservationCancellationRow.interface";

const isEquipmentRow = (
  item: ReservationCancellationItemRow
): boolean =>
  item.extra_id === null &&
  (item.unit !== null || item.category !== null);

const compareById = (
  left: ReservationCancellationItemRow,
  right: ReservationCancellationItemRow
): number => left.id.localeCompare(right.id);

const mapEquipmentLine = (
  item: ReservationCancellationItemRow
): ReservationCancellationEquipmentLine => {
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

export const mapReservationCancellation = (
  row: ReservationCancellationRow
): ReservationCancellation => {
  const startsAt = new Date(row.starts_at);

  return {
    code: row.code,
    customerName: row.customer_name,
    date: getCostaRicaDayRange(startsAt).date,
    equipment: [...row.reservation_items]
      .sort(compareById)
      .filter(isEquipmentRow)
      .map(mapEquipmentLine),
    expectedUpdatedAt: row.updated_at,
    id: row.id,
    isCancellable:
      row.status ===
      RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED,
    status: row.status,
    time: getCostaRicaTime(startsAt),
  };
};
