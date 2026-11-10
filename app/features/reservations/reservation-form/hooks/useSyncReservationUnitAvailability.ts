import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
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
  options.setResolvedRequestKey(null);
};

const startAvailabilityLookup = (
  request: ReservationUnitAvailabilityInput,
  options: ReservationUnitAvailabilitySyncOptions,
  preserveCurrentAvailability: boolean
): (() => void) => {
  let isCurrentRequest = true;
  if (!preserveCurrentAvailability) {
    options.setAvailableQuantity(null);
    options.setAvailableUnits([]);
  }
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
        options.setResolvedRequestKey(options.requestKey);
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

const synchronizeAvailability = (
  options: ReservationUnitAvailabilitySyncOptions,
  previousRequestWindowKey: MutableRefObject<string | null>
): (() => void) | undefined => {
  if (
    !isReservationUnitAvailabilityInput(options.request)
  ) {
    resetAvailability(options);
    return undefined;
  }
  const preserveCurrentAvailability =
    previousRequestWindowKey.current ===
    options.requestWindowKey;
  previousRequestWindowKey.current =
    options.requestWindowKey;
  return startAvailabilityLookup(
    options.request,
    options,
    preserveCurrentAvailability
  );
};

export const useSyncReservationUnitAvailability = (
  options: ReservationUnitAvailabilitySyncOptions
): void => {
  const {
    request,
    refreshKey,
    requestKey,
    requestWindowKey,
    setAvailableQuantity,
    setAvailableUnits,
    setHasError,
    setIsLoading,
    setResolvedRequestKey,
  } = options;
  const {
    categoryId,
    date,
    durationMinutes,
    excludeReservationId,
    time,
  } = request;
  const previousRequestWindowKey = useRef<string | null>(
    null
  );
  useEffect(
    () =>
      synchronizeAvailability(
        {
          request: {
            categoryId,
            date,
            durationMinutes,
            excludeReservationId,
            time,
          },
          refreshKey,
          requestKey,
          requestWindowKey,
          setAvailableQuantity,
          setAvailableUnits,
          setHasError,
          setIsLoading,
          setResolvedRequestKey,
        },
        previousRequestWindowKey
      ),
    [
      categoryId,
      date,
      durationMinutes,
      excludeReservationId,
      time,
      refreshKey,
      requestKey,
      requestWindowKey,
      setAvailableQuantity,
      setAvailableUnits,
      setHasError,
      setIsLoading,
      setResolvedRequestKey,
    ]
  );
};
