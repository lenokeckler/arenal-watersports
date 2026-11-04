import type { BoardCategoryUnitRow } from "@/app/services/board";
import { CATEGORY_UNITS_ERROR } from "../constants/CategoryUnits.constants";
import type { UnitOccupancy } from "../models/UnitOccupancy.interface";

export const buildUnitOccupancy = (
  row: BoardCategoryUnitRow
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
    reservationCode,
    reservationEndsAt,
    reservationId,
    reservationStartsAt,
    returnsAt,
  };
};
