import { RESERVATION_CALENDAR_ERROR } from "@/app/components/reservation-calendar/constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarDispatch } from "@/app/components/reservation-calendar/models/ReservationCalendarDispatch.interface";
import { parseReservationCalendarInstant } from "@/app/components/reservation-calendar/utils/parseReservationCalendarInstant";
import type { ReservationCalendarDispatchSource } from "../models/ReservationCalendarDispatchSource.interface";

export const mapReservationCalendarQueryDispatch = (
  source: ReservationCalendarDispatchSource
): ReservationCalendarDispatch => {
  const startsAt = parseReservationCalendarInstant(
    source.dispatched_at
  );
  const invalidEnd =
    source.ends_at !== null &&
    parseReservationCalendarInstant(source.ends_at) <=
      startsAt;
  const invalidClosure =
    source.closed_at !== null &&
    parseReservationCalendarInstant(source.closed_at) <
      startsAt;
  if (
    source.category?.id !== source.category_id ||
    !source.category?.name.trim() ||
    invalidEnd ||
    invalidClosure
  ) {
    throw new Error(
      RESERVATION_CALENDAR_ERROR.INVALID_DISPATCH,
      { cause: source.id }
    );
  }
  return {
    categoryId: source.category.id,
    categoryName: source.category.name,
    closedAt: source.closed_at,
    endsAt: source.ends_at,
    id: source.id,
    startsAt: source.dispatched_at,
  };
};
