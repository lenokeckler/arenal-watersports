import { startTransition } from "react";
import type { ReservationCategoryAvailabilitySync } from "../models/ReservationCategoryAvailabilitySync.interface";
import { getReservationCategoryAvailabilityAction } from "../actions/getReservationCategoryAvailabilityAction";

const loadAvailability = async (
  sync: ReservationCategoryAvailabilitySync,
  isCurrentRequest: () => boolean
): Promise<void> => {
  const {
    input,
    setAvailability,
    setHasError,
    setIsLoading,
  } = sync;
  try {
    const availability =
      await getReservationCategoryAvailabilityAction(input);
    if (isCurrentRequest()) {
      setAvailability(availability);
    }
  } catch {
    if (isCurrentRequest()) {
      setHasError(true);
    }
  } finally {
    if (isCurrentRequest()) {
      setIsLoading(false);
    }
  }
};

export const startReservationCategoryAvailabilityLookup = (
  sync: ReservationCategoryAvailabilitySync,
  isCurrentRequest: () => boolean
): void => {
  startTransition(() => {
    void loadAvailability(sync, isCurrentRequest);
  });
};
