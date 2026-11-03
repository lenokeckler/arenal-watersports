import type { NullableUndefined } from "@/app/types";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationUnitAvailabilityInput } from "./ReservationUnitAvailabilityInput.interface";

export interface ReservationCategoryAvailabilityPanelViewModelInput {
  category: NullableUndefined<ReservationCategoryOption>;
  refreshKey: number;
  request: ReservationUnitAvailabilityInput;
}
