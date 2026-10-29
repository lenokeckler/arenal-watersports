import { useState } from "react";
import { EMPTY_RESERVATION_CATEGORY_AVAILABILITY } from "../constants/ReservationCategoryAvailability.constants";
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { useSyncReservationUnitAvailability } from "./useSyncReservationUnitAvailability";

export const useReservationUnitAvailability = (
  request: ReservationUnitAvailabilityInput
) => {
  const [availability, setAvailability] =
    useState<ReservationCategoryAvailability>(
      EMPTY_RESERVATION_CATEGORY_AVAILABILITY
    );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useSyncReservationUnitAvailability(
    request,
    setAvailability,
    setIsLoading,
    setHasError
  );

  return { ...availability, hasError, isLoading };
};
