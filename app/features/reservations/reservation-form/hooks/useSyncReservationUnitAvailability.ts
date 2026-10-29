import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { NullableRef } from "@/app/types";
import { EMPTY_RESERVATION_CATEGORY_AVAILABILITY } from "../constants/ReservationCategoryAvailability.constants";
import { RESERVATION_AVAILABILITY } from "../constants/ReservationAvailability.constants";
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationUnitAvailabilitySetters } from "../models/ReservationUnitAvailabilitySetters.interface";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

const resetAvailability = (
  setters: ReservationUnitAvailabilitySetters
): void => {
  setters.setAvailability(
    EMPTY_RESERVATION_CATEGORY_AVAILABILITY
  );
  setters.setIsLoading(false);
  setters.setHasError(false);
};

const startAvailabilityLookup = (
  request: ReservationUnitAvailabilityInput,
  setters: ReservationUnitAvailabilitySetters
): (() => void) => {
  let isCurrentRequest = true;
  setters.setAvailability(
    EMPTY_RESERVATION_CATEGORY_AVAILABILITY
  );
  setters.setIsLoading(true);
  setters.setHasError(false);
  getAvailableReservationUnitsAction(request)
    .then((availability) => {
      if (isCurrentRequest) {
        setters.setAvailability(availability);
      }
    })
    .catch(() => {
      if (isCurrentRequest) {
        setters.setHasError(true);
      }
    })
    .finally(() => {
      if (isCurrentRequest) {
        setters.setIsLoading(false);
      }
    });

  return () => {
    isCurrentRequest = false;
  };
};

const scheduleAvailabilityLookup = (
  request: ReservationUnitAvailabilityInput,
  setters: ReservationUnitAvailabilitySetters
): (() => void) => {
  let cancelRequest: NullableRef<() => void> = null;
  const debounceTimer = window.setTimeout(() => {
    cancelRequest = startAvailabilityLookup(
      request,
      setters
    );
  }, RESERVATION_AVAILABILITY.LOOKUP_DEBOUNCE_MS);

  return () => {
    window.clearTimeout(debounceTimer);
    cancelRequest?.();
  };
};

const synchronizeAvailability = (
  request: ReservationUnitAvailabilityInput,
  setters: ReservationUnitAvailabilitySetters
): (() => void) | undefined => {
  if (!isReservationUnitAvailabilityInput(request)) {
    resetAvailability(setters);
    return undefined;
  }
  return scheduleAvailabilityLookup(request, setters);
};

const useAvailabilityEffect = (
  request: ReservationUnitAvailabilityInput,
  setters: ReservationUnitAvailabilitySetters
): void => {
  const {
    categoryId,
    date,
    durationMinutes,
    quantity,
    time,
  } = request;
  const { setAvailability, setHasError, setIsLoading } =
    setters;
  useEffect(() => {
    const currentRequest = {
      categoryId,
      date,
      durationMinutes,
      quantity,
      time,
    };
    return synchronizeAvailability(currentRequest, {
      setAvailability,
      setHasError,
      setIsLoading,
    });
  }, [
    categoryId,
    date,
    durationMinutes,
    quantity,
    time,
    setAvailability,
    setHasError,
    setIsLoading,
  ]);
};

export const useSyncReservationUnitAvailability = (
  request: ReservationUnitAvailabilityInput,
  setAvailability: Dispatch<
    SetStateAction<ReservationCategoryAvailability>
  >,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setHasError: Dispatch<SetStateAction<boolean>>
): void =>
  useAvailabilityEffect(request, {
    setAvailability,
    setHasError,
    setIsLoading,
  });
