import type { CategoryTrackingMode } from "../../models/CategoryTrackingMode.type";

export interface PhotosScenario {
  trackingMode: CategoryTrackingMode;
  startingFlag: boolean;
  requestedFlag: boolean;
}
