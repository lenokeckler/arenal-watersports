"use server";

import { EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import type { ReservationEquipmentAvailability } from "../models/ReservationEquipmentAvailability.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

export const getAvailableReservationUnitsAction = (
  input: unknown
): Promise<ReservationEquipmentAvailability> => {
  if (!isReservationUnitAvailabilityInput(input)) {
    return Promise.resolve(
      EMPTY_RESERVATION_EQUIPMENT_AVAILABILITY
    );
  }
  const validInput: ReservationUnitAvailabilityInput =
    input;
  return getAvailableReservationUnits(validInput);
};
