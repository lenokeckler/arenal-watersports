import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import type { ReservationCategoryConflictLookupState } from "../models/ReservationCategoryConflictLookupState.interface";
import type { ReservationCategoryConflictWarningViewModel } from "../models/ReservationCategoryConflictWarningViewModel.interface";
import { mapReservationCategoryConflictsToWarningItems } from "./mapReservationCategoryConflictsToWarningItems";

const isSameRequest = (
  left: ReservationUnitAvailabilityInput,
  right: ReservationUnitAvailabilityInput
): boolean =>
  left.categoryId === right.categoryId &&
  left.date === right.date &&
  left.durationMinutes === right.durationMinutes &&
  left.time === right.time;

export const getConflictWarningViewModel = (
  lookup: ReservationCategoryConflictLookupState,
  currentRequest: ReservationUnitAvailabilityInput,
  isValidRequest: boolean
): Omit<
  ReservationCategoryConflictWarningViewModel,
  "retry"
> => {
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
