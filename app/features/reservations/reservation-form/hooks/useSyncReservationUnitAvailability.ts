import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryUnitOption } from "../models/ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { getAvailableReservationUnitsAction } from "../actions/getAvailableReservationUnitsAction";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";

const resetAvailability = (
  setAvailableUnits: Dispatch<
    SetStateAction<ReservationCategoryUnitOption[]>
  >,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setHasError: Dispatch<SetStateAction<boolean>>,
  setHasLoaded: Dispatch<SetStateAction<boolean>>
): void => {
  setAvailableUnits([]);
  setIsLoading(false);
  setHasError(false);
  setHasLoaded(false);
};

const startAvailabilityLookup = (
  request: ReservationUnitAvailabilityInput,
  setAvailableUnits: Dispatch<
    SetStateAction<ReservationCategoryUnitOption[]>
  >,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setHasError: Dispatch<SetStateAction<boolean>>,
  setHasLoaded: Dispatch<SetStateAction<boolean>>
): (() => void) => {
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

export const useSyncReservationUnitAvailability = (
  request: ReservationUnitAvailabilityInput,
  setAvailableUnits: Dispatch<
    SetStateAction<ReservationCategoryUnitOption[]>
  >,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setHasError: Dispatch<SetStateAction<boolean>>,
  setHasLoaded: Dispatch<SetStateAction<boolean>>,
  refreshKey: number
): void => {
  const { categoryId, date, durationMinutes, time } =
    request;
  useEffect(() => {
    const currentRequest = {
      categoryId,
      date,
      durationMinutes,
      time,
    };
    if (
      !isReservationUnitAvailabilityInput(currentRequest)
    ) {
      resetAvailability(
        setAvailableUnits,
        setIsLoading,
        setHasError,
        setHasLoaded
      );
      return undefined;
    }
    return startAvailabilityLookup(
      currentRequest,
      setAvailableUnits,
      setIsLoading,
      setHasError,
      setHasLoaded
    );
  }, [
    categoryId,
    date,
    durationMinutes,
    time,
    setAvailableUnits,
    setHasError,
    setHasLoaded,
    setIsLoading,
    refreshKey,
  ]);
};
