import {
  CALENDAR_PRESENTATION,
  RESERVATIONS_CALENDAR_COPY as copy,
  STRING,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { ReservationCalendarBlock } from "../models/ReservationCalendarBlock.interface";
import type { ReservationCalendarDispatch } from "../models/ReservationCalendarDispatch.interface";
import type { ReservationCalendarEntry } from "../models/ReservationCalendarEntry.interface";
import { describeReservationEquipment } from "./describeReservationEquipment";
import { formatReservationCalendarTime } from "./formatReservationCalendarTime";

const describeInstant = (
  label: string,
  instant: NullableRef<string>,
  unknownLabel: string
): string => {
  const value =
    instant === null
      ? unknownLabel
      : formatReservationCalendarTime(instant);
  return [label, value].join(STRING.SPACE);
};

const describeDispatch = (
  dispatch: ReservationCalendarDispatch
): string =>
  [
    dispatch.categoryName,
    [
      copy.ACTUAL_DEPARTURE,
      formatReservationCalendarTime(dispatch.startsAt),
    ].join(STRING.SPACE),
    describeInstant(
      copy.EXPECTED_RETURN,
      dispatch.endsAt,
      copy.UNKNOWN_EXPECTED_RETURN
    ),
    describeInstant(
      copy.ACTUAL_RETURN,
      dispatch.closedAt,
      copy.UNKNOWN_RETURN
    ),
  ].join(copy.DETAIL_SEPARATOR);

export const buildReservationCalendarBlock = (
  entry: ReservationCalendarEntry
): ReservationCalendarBlock => {
  const equipmentLabel =
    entry.equipment.length === 0
      ? copy.MISSING_EQUIPMENT
      : entry.equipment
          .map(describeReservationEquipment)
          .join(STRING.COMMA_SPACE);
  const scheduledRange = [
    formatReservationCalendarTime(entry.startsAt),
    formatReservationCalendarTime(entry.endsAt),
  ].join(CALENDAR_PRESENTATION.PERIOD_SEPARATOR);
  const scheduledLabel = [
    copy.SCHEDULED,
    scheduledRange,
  ].join(STRING.SPACE);
  const originLabel = entry.parentCode
    ? [copy.ORIGIN, entry.parentCode].join(STRING.SPACE)
    : undefined;
  const actualLabels = entry.dispatches.map(
    describeDispatch
  );
  return {
    accessibleLabel: [
      [copy.RESERVATION_NAME, entry.customerName].join(
        STRING.SPACE
      ),
      scheduledLabel,
      ...actualLabels,
      [copy.EQUIPMENT, equipmentLabel].join(STRING.SPACE),
      ...(originLabel ? [originLabel] : []),
    ].join(copy.DETAIL_SEPARATOR),
    actualLabels,
    customerName: entry.customerName,
    equipmentLabel,
    equipmentCategoryName: entry.equipment[0]?.categoryName,
    guides: entry.guides,
    id: entry.id,
    originLabel,
    scheduledLabel,
    status: entry.status,
  };
};
