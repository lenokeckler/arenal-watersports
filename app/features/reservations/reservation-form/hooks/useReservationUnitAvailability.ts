import { useState } from "react";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { useSyncReservationUnitAvailability } from "./useSyncReservationUnitAvailability";

export const useReservationUnitAvailability = (
  request: ReservationUnitAvailabilityInput,
  refreshKey: number
) => {
  const [availableUnits, setAvailableUnits] = useState<
    ReservationCategoryUnitOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  useSyncReservationUnitAvailability({
    request,
    refreshKey,
    setAvailableUnits,
    setHasError,
    setHasLoaded,
    setIsLoading,
  });

  return { availableUnits, hasError, hasLoaded, isLoading };
};
