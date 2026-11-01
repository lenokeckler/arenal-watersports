import type { ReservationCategoryAvailabilitySync } from "./ReservationCategoryAvailabilitySync.interface";

export interface ReservationCategoryAvailabilityHookSync extends ReservationCategoryAvailabilitySync {
  refreshKey: number;
}
