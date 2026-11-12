import { parseReservationCalendarInstant } from "@/app/components/reservation-calendar/utils/parseReservationCalendarInstant";
import type { BoardCategoryUnitRow } from "@/app/services/board";
import { CATEGORY_UNITS_ERROR } from "../constants/CategoryUnits.constants";
import type { UnitOccupancy } from "../models/UnitOccupancy.interface";

export const buildUnitOccupancy = (
  row: BoardCategoryUnitRow,
  now: Date
): UnitOccupancy => {
  const {
    customer_name: customerName,
    reservation_code: reservationCode,
    reservation_ends_at: reservationEndsAt,
    reservation_id: reservationId,
    reservation_starts_at: reservationStartsAt,
    returns_at: returnsAt,
  } = row;

  if (
    !customerName ||
    !reservationCode ||
    !reservationEndsAt ||
    !reservationId ||
    !reservationStartsAt ||
    !returnsAt
  ) {
    throw new Error(
      CATEGORY_UNITS_ERROR.INCOMPLETE_OCCUPANCY,
      { cause: row.unit_id }
    );
  }

  return {
    customerName,
    isOverdue:
      parseReservationCalendarInstant(returnsAt) <
      now.getTime(),
    reservationCode,
    reservationEndsAt,
    reservationId,
    reservationStartsAt,
    returnsAt,
  };
};
