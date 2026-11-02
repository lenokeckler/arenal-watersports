import type { NullableRef } from "@/app/types";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";

export interface ReservationCategoryAvailabilityPanelStatusProps {
  freeEquipmentCount: NullableRef<number>;
  onRetry: () => void;
  state: ReservationCategoryAvailabilityPanelState;
}
