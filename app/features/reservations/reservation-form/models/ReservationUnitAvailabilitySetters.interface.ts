import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryAvailability } from "./ReservationCategoryAvailability.interface";

export interface ReservationUnitAvailabilitySetters {
  setAvailability: Dispatch<
    SetStateAction<ReservationCategoryAvailability>
  >;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
