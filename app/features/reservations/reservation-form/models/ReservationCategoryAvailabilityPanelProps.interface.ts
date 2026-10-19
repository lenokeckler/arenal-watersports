import type { NullableRef } from "@/app/types";
import type { ReservationCategoryAvailabilityPanelState } from "./ReservationCategoryAvailabilityPanelState.type";

export interface ReservationCategoryAvailabilityPanelProps {
  categoryName: string;
  freeEquipmentCount: NullableRef<number>;
  intervalLabel: string;
  onRetry: () => void;
  state: ReservationCategoryAvailabilityPanelState;
}
