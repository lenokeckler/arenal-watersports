import { RESERVATION_CALENDAR_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarEntry } from "@/app/components/reservation-calendar/models/ReservationCalendarEntry.interface";
import { parseReservationCalendarInstant } from "@/app/components/reservation-calendar/utils/parseReservationCalendarInstant";
import type { ReservationCalendarSource } from "./models/ReservationCalendarSource.interface";
import { mapReservationCalendarQueryDispatch } from "./utils/mapReservationCalendarQueryDispatch";
import { mapReservationCalendarQueryEquipment } from "./utils/mapReservationCalendarQueryEquipment";
import { mapReservationCalendarQueryGuide } from "./utils/mapReservationCalendarQueryGuide";

export const mapReservationCalendarQueryRow = (
  source: ReservationCalendarSource
): ReservationCalendarEntry => {
  if (source.customer_name.trim().length === 0) {
    throw new Error(
      RESERVATION_CALENDAR_ERROR.INVALID_CUSTOMER_NAME,
      { cause: source.id }
    );
  }
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
      mapReservationCalendarQueryDispatch
    ),
    endsAt: source.ends_at,
    equipment: source.reservation_items.flatMap((item) => {
      const equipment =
        mapReservationCalendarQueryEquipment(item);
      return equipment === null ? [] : [equipment];
    }),
    guides: source.reservation_guides?.map(
      mapReservationCalendarQueryGuide
    ),
    id: source.id,
    startsAt: source.starts_at,
    status: source.status,
  };
};
