import type { Dispatch, SetStateAction } from "react";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "./ReservationUnitAvailabilityInput.interface";

export interface ReservationUnitAvailabilitySyncOptions {
  request: ReservationUnitAvailabilityInput;
  requestKey: string;
  setAvailableUnits: Dispatch<
    SetStateAction<ReservationCategoryUnitOption[]>
  >;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setResolvedRequestKey: Dispatch<SetStateAction<string>>;
}
