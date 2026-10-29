"use server";

import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

export const getAvailableReservationUnitsAction = (
  input: unknown
): Promise<ReservationCategoryUnitOption[]> => {
  if (!isReservationUnitAvailabilityInput(input)) {
    return Promise.resolve([]);
  }
  const validInput: ReservationUnitAvailabilityInput =
    input;
  return getAvailableReservationUnits(validInput);
};
