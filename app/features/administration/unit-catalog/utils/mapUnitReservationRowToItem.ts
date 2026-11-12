import type { UnitReservationItem } from "../models/UnitReservationItem.interface";
import type { UnitReservationRow } from "../models/UnitReservationRow.type";

export const mapUnitReservationRowToItem = (
  reservationRow: UnitReservationRow
): UnitReservationItem => ({
  id: reservationRow.id,
  code: reservationRow.code,
  customerName: reservationRow.customer_name,
  startsAt: reservationRow.starts_at,
  status: reservationRow.status,
});
