import { useState } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCategoryAvailability } from "../models/ReservationCategoryAvailability.type";
import type { ReservationUnitAvailabilityInput } from "../models/ReservationUnitAvailabilityInput.interface";
import { useSyncReservationCategoryAvailability } from "./useSyncReservationCategoryAvailability";

export const useReservationCategoryAvailability = (
  request: ReservationUnitAvailabilityInput,
  refreshKey: number
) => {
  const [availability, setAvailability] =
    useState<NullableRef<ReservationCategoryAvailability>>(
      null
    );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  useSyncReservationCategoryAvailability({
    input: request,
    refreshKey,
    setAvailability,
    setHasError,
    setIsLoading,
  });

  return { availability, hasError, isLoading };
};
