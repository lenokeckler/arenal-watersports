"use server";

import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { EMPTY_RESERVATION_CATEGORY_AVAILABILITY } from "../constants/ReservationCategoryAvailability.constants";
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.interface";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

export const getAvailableReservationUnitsAction = (
  input: unknown
): Promise<ReservationCategoryAvailability> => {
  if (!isReservationUnitAvailabilityInput(input)) {
    return Promise.resolve(
      EMPTY_RESERVATION_CATEGORY_AVAILABILITY
    );
  }

  const validInput: ReservationUnitAvailabilityInput =
    input;
  return getAvailableReservationUnits(validInput);
};
