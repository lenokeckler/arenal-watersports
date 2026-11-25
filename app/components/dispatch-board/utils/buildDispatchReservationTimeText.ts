import { DISPATCH_BOARD_COPY } from "../constants/DispatchBoard.constants";
import type { PendingDispatchReservation } from "../models/PendingDispatchReservation.interface";
import { formatCostaRicaTime } from "./formatCostaRicaTime";

export const buildDispatchReservationTimeText = (
  reservation: PendingDispatchReservation
): string => {
  const startTime = formatCostaRicaTime(
    reservation.starts_at
  );
  const hasPendingRest = reservation.equipment.some(
    (item) => item.quantity < item.totalQuantity
  );

  if (!hasPendingRest) {
    return startTime;
  }

  return `${startTime}${DISPATCH_BOARD_COPY.RESERVATION_SEPARATOR}${DISPATCH_BOARD_COPY.EXPIRES(formatCostaRicaTime(reservation.ends_at))}`;
};
