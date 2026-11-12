import type { ReservationCategoryAvailabilitySync } from "../models/ReservationCategoryAvailabilitySync.interface";
import { isReservationUnitAvailabilityInput } from "./isReservationUnitAvailabilityInput";
import { startReservationCategoryAvailabilityLookup } from "./startReservationCategoryAvailabilityLookup";

export const syncReservationCategoryAvailability = (
  sync: ReservationCategoryAvailabilitySync
): (() => void) => {
  let isCurrentRequest = true;
  const {
    input,
    setAvailability,
    setHasError,
    setIsLoading,
  } = sync;
  if (!isReservationUnitAvailabilityInput(input)) {
    setAvailability(null);
    setIsLoading(false);
    setHasError(false);
    return () => {
      isCurrentRequest = false;
    };
  }

  setAvailability(null);
  setIsLoading(true);
  setHasError(false);
  startReservationCategoryAvailabilityLookup(
    sync,
    () => isCurrentRequest
  );

  return () => {
    isCurrentRequest = false;
  };
};
