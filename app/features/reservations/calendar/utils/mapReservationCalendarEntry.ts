import { RESERVATION_CALENDAR_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarEntry } from "@/app/components/reservation-calendar/models/ReservationCalendarEntry.interface";
import type { ReservationCalendarSource } from "../models/ReservationCalendarSource.interface";
import { mapReservationCalendarDispatch } from "./mapReservationCalendarDispatch";
import { mapReservationCalendarEquipment } from "./mapReservationCalendarEquipment";
import { parseReservationCalendarInstant } from "@/app/components/reservation-calendar/utils/parseReservationCalendarInstant";

export const mapReservationCalendarEntry = (
  source: ReservationCalendarSource
): ReservationCalendarEntry => {
  if (
    source.ends_at === null ||
    parseReservationCalendarInstant(source.ends_at) <=
      parseReservationCalendarInstant(source.starts_at)
  ) {
    throw new Error(
      RESERVATION_CALENDAR_ERROR.INVALID_SCHEDULE,
      { cause: source.id }
    );
  }
  return {
    customerName: source.customer_name,
    dispatches: source.reservation_dispatches.map(
      mapReservationCalendarDispatch
    ),
    endsAt: source.ends_at,
    equipment: source.reservation_items.flatMap(
      (item): ReservationCalendarEntry["equipment"] => {
        const equipment =
          mapReservationCalendarEquipment(item);
        return equipment === null ? [] : [equipment];
      }
    ),
    id: source.id,
    startsAt: source.starts_at,
    status: source.status,
  };
};
