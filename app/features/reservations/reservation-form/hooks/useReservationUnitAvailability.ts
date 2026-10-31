import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { useSyncReservationUnitAvailability } from "./useSyncReservationUnitAvailability";

export const useReservationUnitAvailability = (
  request: ReservationUnitAvailabilityInput
) => {
  const [availableUnits, setAvailableUnits] = useState<
    ReservationCategoryUnitOption[]
  >([]);
  const [availableQuantity, setAvailableQuantity] =
    useState<NullableRef<number>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryIndex, setRetryIndex] = useState(0);
  useSyncReservationUnitAvailability({
    request,
    retryIndex,
    setAvailableQuantity,
    setAvailableUnits,
    setHasError,
    setIsLoading,
  });

  return {
    availableQuantity,
    availableUnits,
    hasError,
    isLoading,
    retry: () =>
      setRetryIndex((currentIndex) => currentIndex + 1),
  };
};
