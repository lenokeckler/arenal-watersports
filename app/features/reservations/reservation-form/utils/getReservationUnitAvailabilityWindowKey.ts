import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

export const getReservationUnitAvailabilityWindowKey = (
  request: ReservationUnitAvailabilityInput
): string =>
  JSON.stringify([
    request.categoryId,
    request.date,
    request.durationMinutes,
    request.excludeReservationId,
    request.time,
  ]);
