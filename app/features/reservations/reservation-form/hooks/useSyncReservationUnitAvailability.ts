import { useEffect } from "react";
import type { ReservationUnitAvailabilitySyncOptions } from "../models/ReservationUnitAvailabilitySyncOptions.interface";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

const resetAvailability = ({
  setAvailableUnits,
  setHasError,
  setHasLoaded,
  setIsLoading,
}: ReservationUnitAvailabilitySyncOptions): void => {
  setAvailableUnits([]);
  setIsLoading(false);
  setHasError(false);
  setHasLoaded(false);
};

const startAvailabilityLookup = ({
  request,
  setAvailableUnits,
  setHasError,
  setHasLoaded,
  setIsLoading,
}: ReservationUnitAvailabilitySyncOptions): (() => void) => {
  let isCurrentRequest = true;
  setAvailableUnits([]);
  setIsLoading(true);
  setHasError(false);
  setHasLoaded(false);
  getAvailableReservationUnitsAction(request)
    .then((units) => {
      if (isCurrentRequest) {
        setAvailableUnits(units);
      }
    })
    .catch(() => {
      if (isCurrentRequest) {
        setHasError(true);
      }
    })
    .finally(() => {
      if (isCurrentRequest) {
        setIsLoading(false);
        setHasLoaded(true);
      }
    });

  return () => {
    isCurrentRequest = false;
  };
};

const synchronizeAvailability = (
  options: ReservationUnitAvailabilitySyncOptions
): (() => void) | undefined => {
  if (
    !isReservationUnitAvailabilityInput(options.request)
  ) {
    resetAvailability(options);
    return undefined;
  }
  return startAvailabilityLookup(options);
};

export const useSyncReservationUnitAvailability = (
  options: ReservationUnitAvailabilitySyncOptions
): void => {
  const {
    request: { categoryId, date, durationMinutes, time },
    refreshKey,
  } = options;
  const {
    setAvailableUnits,
    setHasError,
    setHasLoaded,
    setIsLoading,
  } = options;
  useEffect(
    () =>
      synchronizeAvailability({
        request: {
          categoryId,
          date,
          durationMinutes,
          time,
        },
        refreshKey,
        setAvailableUnits,
        setHasError,
        setHasLoaded,
        setIsLoading,
      }),
    [
      categoryId,
      date,
      durationMinutes,
      time,
      setAvailableUnits,
      setHasError,
      setHasLoaded,
      setIsLoading,
      refreshKey,
    ]
  );
};
