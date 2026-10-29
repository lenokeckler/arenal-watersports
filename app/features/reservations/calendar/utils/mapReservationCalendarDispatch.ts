import { RESERVATION_CALENDAR_ERROR } from "../constants/ReservationCalendarProjection.constants";
import type { ReservationCalendarDispatch } from "../models/ReservationCalendarDispatch.interface";
import type { ReservationCalendarDispatchSource } from "../models/ReservationCalendarDispatchSource.interface";
import { parseReservationCalendarInstant } from "./parseReservationCalendarInstant";

export const mapReservationCalendarDispatch = (
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
