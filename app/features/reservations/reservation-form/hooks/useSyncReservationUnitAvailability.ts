import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationUnitAvailabilitySyncOptions } from "../models/ReservationUnitAvailabilitySyncOptions.interface";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

const resetAvailability = (
  setAvailableUnits: Dispatch<
    SetStateAction<ReservationCategoryUnitOption[]>
  >,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setHasError: Dispatch<SetStateAction<boolean>>,
  setResolvedRequestKey: Dispatch<SetStateAction<string>>
): void => {
  setAvailableUnits([]);
  setIsLoading(false);
  setHasError(false);
  setResolvedRequestKey("");
};

const startAvailabilityLookup = (
  request: ReservationUnitAvailabilityInput,
  options: ReservationUnitAvailabilitySyncOptions
): (() => void) => {
  let isCurrentRequest = true;
  options.setAvailableUnits([]);
  options.setIsLoading(true);
  options.setHasError(false);
  getAvailableReservationUnitsAction(request)
    .then((units) => {
      if (isCurrentRequest) {
        options.setAvailableUnits(units);
      }
    })
    .catch(() => {
      if (isCurrentRequest) {
        options.setHasError(true);
      }
    })
    .finally(() => {
      if (isCurrentRequest) {
        options.setResolvedRequestKey(options.requestKey);
        options.setIsLoading(false);
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
    resetAvailability(
      options.setAvailableUnits,
      options.setIsLoading,
      options.setHasError,
      options.setResolvedRequestKey
    );
    return undefined;
  }
  return startAvailabilityLookup(options.request, options);
};

export const useSyncReservationUnitAvailability = (
  options: ReservationUnitAvailabilitySyncOptions
): void => {
  const { categoryId, date, durationMinutes, time } =
    options.request;
  const {
    requestKey,
    setAvailableUnits,
    setHasError,
    setIsLoading,
    setResolvedRequestKey,
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
        requestKey,
        setAvailableUnits,
        setHasError,
        setIsLoading,
        setResolvedRequestKey,
      }),
    [
      categoryId,
      date,
      durationMinutes,
      time,
      requestKey,
      setAvailableUnits,
      setHasError,
      setIsLoading,
      setResolvedRequestKey,
    ]
  );
};
