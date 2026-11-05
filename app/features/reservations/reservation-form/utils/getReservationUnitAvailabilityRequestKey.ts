import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getReservationUnitAvailabilityWindowKey } from "./getReservationUnitAvailabilityWindowKey";

export const getReservationUnitAvailabilityRequestKey = (
  request: ReservationUnitAvailabilityInput,
  refreshKey: number
): string =>
  JSON.stringify([
    getReservationUnitAvailabilityWindowKey(request),
    refreshKey,
  ]);
