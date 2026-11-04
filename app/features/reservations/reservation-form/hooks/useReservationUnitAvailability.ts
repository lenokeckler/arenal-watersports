import { useState } from "react";
import { getReservationUnitAvailabilityRequestKey } from "../utils/getReservationUnitAvailabilityRequestKey";
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
  const [resolvedRequestKey, setResolvedRequestKey] =
    useState("");
  const requestKey =
    getReservationUnitAvailabilityRequestKey(
      request,
      refreshKey
    );
  useSyncReservationUnitAvailability({
    request,
    requestKey,
    setAvailableUnits,
    setHasError,
    setIsLoading,
    setResolvedRequestKey,
  });

  return {
    availableUnits,
    hasError,
    isLoading,
    isResolvedForCurrentRequest:
      resolvedRequestKey === requestKey,
  };
};
