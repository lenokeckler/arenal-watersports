import { useEffect } from "react";
import type { ReservationUnitAvailabilitySyncOptions } from "../models/ReservationUnitAvailabilitySyncOptions.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

const resetAvailability = (
  options: ReservationUnitAvailabilitySyncOptions
): void => {
  options.setAvailableQuantity(null);
  options.setAvailableUnits([]);
  options.setIsLoading(false);
  options.setHasError(false);
};

const startAvailabilityLookup = (
  request: ReservationUnitAvailabilityInput,
  options: ReservationUnitAvailabilitySyncOptions
): (() => void) => {
  let isCurrentRequest = true;
  options.setAvailableQuantity(null);
  options.setAvailableUnits([]);
  options.setIsLoading(true);
  options.setHasError(false);
  getAvailableReservationUnitsAction(request)
    .then((availability) => {
      if (isCurrentRequest) {
        options.setAvailableQuantity(
          availability.availableQuantity
        );
        options.setAvailableUnits(
          availability.availableUnits
        );
      }
    })
    .catch(() => {
      if (isCurrentRequest) {
        options.setHasError(true);
      }
    })
    .finally(() => {
      if (isCurrentRequest) {
        options.setIsLoading(false);
      }
    });

  return () => {
    isCurrentRequest = false;
  };
};

export const useSyncReservationUnitAvailability = (
  options: ReservationUnitAvailabilitySyncOptions
): void => {
  const {
    request,
    retryIndex,
    setAvailableQuantity,
    setAvailableUnits,
    setHasError,
    setIsLoading,
  } = options;
  const { categoryId, date, durationMinutes, time } =
    request;
  useEffect(() => {
    const currentRequest = {
      categoryId,
      date,
      durationMinutes,
      time,
    };
    const currentOptions = {
      request: currentRequest,
      retryIndex,
      setAvailableQuantity,
      setAvailableUnits,
      setHasError,
      setIsLoading,
    };
    if (
      !isReservationUnitAvailabilityInput(currentRequest)
    ) {
      resetAvailability(currentOptions);
      return undefined;
    }
    return startAvailabilityLookup(
      currentRequest,
      currentOptions
    );
  }, [
    categoryId,
    date,
    durationMinutes,
    time,
    setAvailableQuantity,
    setAvailableUnits,
    setHasError,
    setIsLoading,
    retryIndex,
  ]);
};
