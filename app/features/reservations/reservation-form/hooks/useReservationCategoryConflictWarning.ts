import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryConflictLookupState } from "../models/ReservationCategoryConflictLookupState.interface";
import { getReservationCategoryConflictsAction } from "../actions/getReservationCategoryConflictsAction";
import { isReservationUnitAvailabilityInput } from "../utils/isReservationUnitAvailabilityInput";
import { mapReservationCategoryConflictsToWarningItems } from "../utils/mapReservationCategoryConflictsToWarningItems";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryConflictWarningViewModel } from "../models/ReservationCategoryConflictWarningViewModel.interface";

const EMPTY_CONFLICT_LOOKUP_STATE: ReservationCategoryConflictLookupState =
  {
    conflicts: [],
    hasError: false,
    isLoading: false,
    request: null,
  };

const isSameRequest = (
  left: ReservationUnitAvailabilityInput,
  right: ReservationUnitAvailabilityInput
): boolean =>
  left.categoryId === right.categoryId &&
  left.date === right.date &&
  left.durationMinutes === right.durationMinutes &&
  left.time === right.time;

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

const getConflictWarningViewModel = (
  lookup: ReservationCategoryConflictLookupState,
  currentRequest: ReservationUnitAvailabilityInput,
  isValidRequest: boolean
): ReservationCategoryConflictWarningViewModel => {
  const hasCurrentLookup =
    lookup.request !== null &&
    isSameRequest(lookup.request, currentRequest);
  const conflicts = hasCurrentLookup
    ? lookup.conflicts
    : [];

  return {
    hasError: hasCurrentLookup && lookup.hasError,
    isLoading:
      isValidRequest &&
      (!hasCurrentLookup || lookup.isLoading),
    items:
      mapReservationCategoryConflictsToWarningItems(
        conflicts
      ),
  };
};

const useReservationCategoryConflictLookup = (
  request: ReservationUnitAvailabilityInput,
  setLookup: Dispatch<
    SetStateAction<ReservationCategoryConflictLookupState>
  >
): void => {
  const { categoryId, date, durationMinutes, time } =
    request;

  useEffect(() => {
    let isCurrentRequest = true;
    const requestedInput = {
      categoryId,
      date,
      durationMinutes,
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
  }, [categoryId, date, durationMinutes, time, setLookup]);
};

export const useReservationCategoryConflictWarning = (
  request: ReservationUnitAvailabilityInput
): ReservationCategoryConflictWarningViewModel => {
  const [lookup, setLookup] = useState(
    EMPTY_CONFLICT_LOOKUP_STATE
  );
  const currentRequest = request;
  const isValidRequest =
    isReservationUnitAvailabilityInput(currentRequest);
  useReservationCategoryConflictLookup(request, setLookup);

  return getConflictWarningViewModel(
    lookup,
    currentRequest,
    isValidRequest
  );
};
