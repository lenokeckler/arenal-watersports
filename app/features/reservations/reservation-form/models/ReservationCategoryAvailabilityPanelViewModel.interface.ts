import type { NullableRef } from "@/app/types";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";

export interface ReservationCategoryAvailabilityPanelViewModel {
  categoryAvailability: NullableRef<number>;
  categoryAvailabilityCategoryName: string;
  categoryAvailabilityInterval: string;
  categoryAvailabilityState: ReservationCategoryAvailabilityPanelState;
  handleRetryCategoryAvailability: () => void;
}
