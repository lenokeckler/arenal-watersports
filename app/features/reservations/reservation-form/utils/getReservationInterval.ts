import type { ReservationInterval } from "../models/ReservationInterval.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getReservationWindow } from "./getReservationWindow";

export const getReservationInterval = (
  input: ReservationUnitAvailabilityInput
): ReservationInterval => getReservationWindow(input);
