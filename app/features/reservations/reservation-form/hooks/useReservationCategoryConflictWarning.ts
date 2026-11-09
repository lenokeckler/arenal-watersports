import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryConflictLookupState } from "../models/ReservationCategoryConflictLookupState.interface";
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";
import { getConflictWarningViewModel } from "../utils/getConflictWarningViewModel";
import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryConflictWarningViewModel } from "../models/ReservationCategoryConflictWarningViewModel.interface";

const REFRESH_TRIGGER_INCREMENT = 1;

const EMPTY_CONFLICT_LOOKUP_STATE: ReservationCategoryConflictLookupState =
  {
    conflicts: [],
    hasError: false,
    isLoading: false,
    request: null,
  };

const getReservationCategoryConflictLookupState = async (
  requestedInput: ReservationUnitAvailabilityInput
): Promise<ReservationCategoryConflictLookupState> => {
  try {
    return {
      conflicts:
        await getReservationCategoryConflictsAction(
          requestedInput
        ),
      hasError: false,
      isLoading: false,
      request: requestedInput,
    };
  } catch {
    return {
      conflicts: [],
      hasError: true,
      isLoading: false,
      request: requestedInput,
    };
  }
};

const activateReservationCategoryConflictLookup = (
  request: ReservationUnitAvailabilityInput,
  setLookup: Dispatch<
    SetStateAction<ReservationCategoryConflictLookupState>
  >
): void => {
  setLookup({
    conflicts: [],
    hasError: false,
    isLoading: true,
    request,
  });
};

const useReservationCategoryConflictLookup = (
  request: ReservationUnitAvailabilityInput,
  refreshKey: number,
  retryRevision: number,
  setLookup: Dispatch<
    SetStateAction<ReservationCategoryConflictLookupState>
  >
): void => {
  const {
    categoryId,
    date,
    durationMinutes,
    excludeReservationId,
    time,
  } = request;

  useEffect(() => {
    let isCurrentRequest = true;
    const requestedInput = {
      categoryId,
      date,
      durationMinutes,
      excludeReservationId,
      time,
    };
    if (
      !isReservationUnitAvailabilityInput(requestedInput)
    ) {
      return () => {
        isCurrentRequest = false;
      };
    }

    activateReservationCategoryConflictLookup(
      requestedInput,
      setLookup
    );
    void getReservationCategoryConflictLookupState(
      requestedInput
    ).then((result) => {
      if (isCurrentRequest) {
        setLookup(result);
      }
    });

    return () => {
      isCurrentRequest = false;
    };
  }, [
    categoryId,
    date,
    durationMinutes,
    excludeReservationId,
    time,
    refreshKey,
    retryRevision,
    setLookup,
  ]);
};

export const useReservationCategoryConflictWarning = (
  request: ReservationUnitAvailabilityInput,
  refreshKey: number
): ReservationCategoryConflictWarningViewModel => {
  const [lookup, setLookup] = useState(
    EMPTY_CONFLICT_LOOKUP_STATE
  );
  const [retryRevision, setRetryRevision] = useState(0);
  const retry = useCallback(
    () =>
      setRetryRevision(
        (currentRevision) =>
          currentRevision + REFRESH_TRIGGER_INCREMENT
      ),
    []
  );
  const currentRequest = request;
  const isValidRequest =
    isReservationUnitAvailabilityInput(currentRequest);
  useReservationCategoryConflictLookup(
    request,
    refreshKey,
    retryRevision,
    setLookup
  );

  return {
    ...getConflictWarningViewModel(
      lookup,
      currentRequest,
      isValidRequest
    ),
    retry,
  };
};
