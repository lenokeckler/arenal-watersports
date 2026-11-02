import type { NullableRef } from "@/app/types";
import type { ReservationCategoryConflict } from "./ReservationCategoryConflict.type";
import type { ReservationUnitAvailabilityInput } from "./ReservationUnitAvailabilityInput.interface";

export interface ReservationCategoryConflictLookupState {
  conflicts: ReservationCategoryConflict[];
  hasError: boolean;
  isLoading: boolean;
  request: NullableRef<ReservationUnitAvailabilityInput>;
}
