import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "./ReservationUnitAvailabilityInput.interface";

export interface ReservationUnitAvailabilitySyncOptions {
  request: ReservationUnitAvailabilityInput;
  refreshKey: number;
  setAvailableUnits: Dispatch<
    SetStateAction<ReservationCategoryUnitOption[]>
  >;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setHasLoaded: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
