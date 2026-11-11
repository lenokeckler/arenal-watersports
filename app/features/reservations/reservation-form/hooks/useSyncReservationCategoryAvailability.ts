import { useEffect } from "react";
import type { ReservationCategoryAvailabilityHookSync } from "../models/ReservationCategoryAvailabilityHookSync.interface";
import { syncReservationCategoryAvailability } from "../utils/syncReservationCategoryAvailability";

export const useSyncReservationCategoryAvailability = (
  sync: ReservationCategoryAvailabilityHookSync
): void => {
  const {
    input,
    refreshKey,
    setAvailability,
    setHasError,
    setIsLoading,
  } = sync;
  const {
    categoryId,
    date,
    durationMinutes,
    excludeReservationId,
    time,
  } = input;
  useEffect(
    () =>
      syncReservationCategoryAvailability({
        input: {
          categoryId,
          date,
          durationMinutes,
          excludeReservationId,
          time,
        },
        setAvailability,
        setHasError,
        setIsLoading,
      }),
    [
      categoryId,
      date,
      durationMinutes,
      excludeReservationId,
      time,
      refreshKey,
      setAvailability,
      setHasError,
      setIsLoading,
    ]
  );
};
