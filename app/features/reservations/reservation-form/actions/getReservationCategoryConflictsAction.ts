"use server";

import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryConflict } from "../models/ReservationCategoryConflict.type";
import { getReservationCategoryConflicts } from "../services/getReservationCategoryConflicts";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

const INVALID_CATEGORY_CONFLICT_INPUT =
  "Invalid reservation category conflict input.";

export const getReservationCategoryConflictsAction = async (
  input: unknown
): Promise<ReservationCategoryConflict[]> => {
  if (!isReservationUnitAvailabilityInput(input)) {
    throw new Error(INVALID_CATEGORY_CONFLICT_INPUT);
  }

  return await getReservationCategoryConflicts(
    input satisfies ReservationUnitAvailabilityInput
  );
};
