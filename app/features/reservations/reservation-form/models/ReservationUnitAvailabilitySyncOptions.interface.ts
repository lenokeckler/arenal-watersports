import type { Dispatch, SetStateAction } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";
import type { ReservationUnitAvailabilityInput } from "./ReservationUnitAvailabilityInput.interface";

export interface ReservationUnitAvailabilitySyncOptions {
  request: ReservationUnitAvailabilityInput;
  setAvailableQuantity: Dispatch<
    SetStateAction<NullableRef<number>>
  >;
  setAvailableUnits: Dispatch<
    SetStateAction<ReservationCategoryUnitOption[]>
  >;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
