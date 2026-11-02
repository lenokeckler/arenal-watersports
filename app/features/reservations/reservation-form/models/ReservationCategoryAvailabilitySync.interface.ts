import type { Dispatch, SetStateAction } from "react";
import type { NullableRef } from "@/app/types";
import type { ReservationCategoryAvailability } from "./ReservationCategoryAvailability.type";
import type { ReservationUnitAvailabilityInput } from "./ReservationUnitAvailabilityInput.interface";

export interface ReservationCategoryAvailabilitySync {
  input: ReservationUnitAvailabilityInput;
  setAvailability: Dispatch<
    SetStateAction<
      NullableRef<ReservationCategoryAvailability>
    >
  >;
  setHasError: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
