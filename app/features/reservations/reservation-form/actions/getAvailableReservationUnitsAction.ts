"use server";

import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import { getAvailableReservationUnits } from "../services/getAvailableReservationUnits";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

export const getAvailableReservationUnitsAction = async (
  input: unknown
): Promise<ReservationCategoryUnitOption[]> => {
  if (!isReservationUnitAvailabilityInput(input)) {
    return Promise.resolve([]);
  }

  return await getAvailableReservationUnits(
    input satisfies ReservationUnitAvailabilityInput
  );
};
