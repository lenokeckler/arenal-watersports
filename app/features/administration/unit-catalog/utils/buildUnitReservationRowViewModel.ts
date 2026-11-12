import { UNIT_RESERVATION_STATUS_LABEL } from "../constants/UnitReservationStatusLabel.constants";
import type { UnitReservationItem } from "../models/UnitReservationItem.interface";
import type { UnitReservationRowViewModel } from "../models/UnitReservationRowViewModel.interface";
import { formatUnitReservationStart } from "./formatUnitReservationStart";

export const buildUnitReservationRowViewModel = (
  reservation: UnitReservationItem
): UnitReservationRowViewModel => ({
  id: reservation.id,
  code: reservation.code,
  customerName: reservation.customerName,
  startsAtText: formatUnitReservationStart(
    reservation.startsAt
  ),
  statusLabel:
    UNIT_RESERVATION_STATUS_LABEL[reservation.status],
});
