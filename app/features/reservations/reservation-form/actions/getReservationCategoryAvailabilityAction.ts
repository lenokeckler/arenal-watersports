"use server";

import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.type";
import { getReservationCategoryAvailability } from "../services/getReservationCategoryAvailability";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

const INVALID_AVAILABILITY_INPUT =
  "Invalid reservation category availability input.";

export const getReservationCategoryAvailabilityAction =
  async (
    input: unknown
  ): Promise<ReservationCategoryAvailability> => {
    if (!isReservationUnitAvailabilityInput(input)) {
      throw new Error(INVALID_AVAILABILITY_INPUT);
    }

    return await getReservationCategoryAvailability(
      input satisfies ReservationUnitAvailabilityInput
    );
  };
