import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";

export const getReservationUnitAvailabilityRequestKey = (
  request: ReservationUnitAvailabilityInput,
  refreshKey: number
): string => JSON.stringify([request, refreshKey]);
