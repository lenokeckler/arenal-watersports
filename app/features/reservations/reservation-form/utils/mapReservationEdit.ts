import {
  RESERVATION_CALENDAR_ACTIVE_STATUS,
  STRING,
} from "@/app/constants";
import { formatReservationCalendarDateTime } from "@/app/components/reservation-calendar/utils/formatReservationCalendarDateTime";
import { mapReservationCalendarQueryEquipment } from "@/app/services/reservations/utils/mapReservationCalendarQueryEquipment";
import type { NullableRef } from "@/app/types";
import { RESERVATION_EDIT_COPY } from "../constants/ReservationEditCopy.constants";
import { RESERVATION_EDIT_QUERY } from "../constants/ReservationEditQuery.constants";
import {
  RESERVATION_EQUIPMENT_LOCK,
  type ReservationEquipmentLock,
} from "../constants/ReservationEquipmentLock.constants";
import type { ReservationEdit } from "../models/ReservationEdit.interface";
import type { ReservationEditEquipment } from "../models/ReservationEditEquipment.interface";
import type { ReservationEditRow } from "../models/ReservationEditRow.type";
import type { ReservationEditRowItem } from "../models/ReservationEditRowItem.type";
import { getCostaRicaDate } from "./getCostaRicaDate";
import { getCostaRicaTime } from "./getCostaRicaTime";

const getEditableItems = (
  row: ReservationEditRow
): ReservationEditRowItem[] =>
  row.reservation_items
    .filter(
      (item) =>
        item.extra_id === null && item.dispatch_id === null
    )
    .sort((first, second) =>
      first.id.localeCompare(second.id)
    );

const resolveEquipmentLock = (
  row: ReservationEditRow,
  editableItemCount: number
): ReservationEquipmentLock => {
  if (row.type === RESERVATION_EDIT_QUERY.COMBO_TYPE) {
    return RESERVATION_EQUIPMENT_LOCK.COMBO;
  }
  return editableItemCount > 1
    ? RESERVATION_EQUIPMENT_LOCK.MULTIPLE_ITEMS
    : RESERVATION_EQUIPMENT_LOCK.NONE;
};

const mapEquipment = (
  items: ReservationEditRowItem[]
): NullableRef<ReservationEditEquipment> => {
  const [firstItem] = items;
  const equipment =
    firstItem &&
    mapReservationCalendarQueryEquipment(firstItem);
  return equipment
    ? { ...equipment, unitId: firstItem.unit_id }
    : null;
};

const buildLastEditLabel = (
  lastEditorName: string,
  updatedAt: string
): string =>
  [
    RESERVATION_EDIT_COPY.LAST_EDIT,
    [
      lastEditorName,
      formatReservationCalendarDateTime(updatedAt),
    ].join(RESERVATION_EDIT_COPY.LAST_EDIT_SEPARATOR),
  ].join(STRING.SPACE);

export const mapReservationEdit = (
  row: ReservationEditRow,
  lastEditorName: string
): ReservationEdit => {
  const editableItems = getEditableItems(row);
  const startsAt = new Date(row.starts_at);
  return {
    customerName: row.customer_name,
    date: getCostaRicaDate(startsAt),
    durationMinutes: row.duration_minutes,
    equipment: mapEquipment(editableItems),
    equipmentLock: resolveEquipmentLock(
      row,
      editableItems.length
    ),
    id: row.id,
    isEditable:
      row.status ===
        RESERVATION_CALENDAR_ACTIVE_STATUS.SCHEDULED &&
      editableItems.length > 0,
    lastEditLabel: buildLastEditLabel(
      lastEditorName,
      row.updated_at
    ),
    lastEditedAt: row.updated_at,
    peopleCount: row.people_count,
    time: getCostaRicaTime(startsAt),
  };
};
