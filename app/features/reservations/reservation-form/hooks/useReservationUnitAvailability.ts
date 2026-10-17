import { useState } from "react";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { useSyncReservationUnitAvailability } from "./useSyncReservationUnitAvailability";

export const useReservationUnitAvailability = (
  request: ReservationUnitAvailabilityInput
) => {
  const [availableUnits, setAvailableUnits] = useState<
    ReservationCategoryUnitOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useSyncReservationUnitAvailability(
    request,
    setAvailableUnits,
    setIsLoading,
    setHasError
  );

  return { availableUnits, hasError, isLoading };
};
