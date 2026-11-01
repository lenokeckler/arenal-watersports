import { useCallback, useState } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getReservationUnitAvailabilityRequestKey } from "../utils/getReservationUnitAvailabilityRequestKey";
import { getReservationUnitAvailabilityWindowKey } from "../utils/getReservationUnitAvailabilityWindowKey";
import { useSyncReservationUnitAvailability } from "./useSyncReservationUnitAvailability";

export const useReservationUnitAvailability = (
  request: ReservationUnitAvailabilityInput,
  refreshKey: number
) => {
  const [retryKey, setRetryKey] = useState(0);
  const retry = useCallback((): void => {
    setRetryKey((currentKey) => currentKey + 1);
  }, []);
  const [availableUnits, setAvailableUnits] = useState<
    ReservationCategoryUnitOption[]
  >([]);
  const [availableQuantity, setAvailableQuantity] =
    useState<NullableRef<number>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resolvedRequestKey, setResolvedRequestKey] =
    useState<NullableRef<string>>(null);
  const requestKey =
    getReservationUnitAvailabilityRequestKey(
      request,
      refreshKey + retryKey
    );
  const requestWindowKey =
    getReservationUnitAvailabilityWindowKey(request);
  useSyncReservationUnitAvailability({
    request,
    refreshKey,
    requestKey,
    requestWindowKey,
    setAvailableQuantity,
    setAvailableUnits,
    setHasError,
    setIsLoading,
    setResolvedRequestKey,
  });

  return {
    availableQuantity,
    availableUnits,
    hasError,
    isLoading,
    isResolvedForCurrentRequest:
      resolvedRequestKey === requestKey,
    retry,
  };
};
