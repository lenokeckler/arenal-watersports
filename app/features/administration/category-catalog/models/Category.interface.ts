import { Nullable } from "@/app/types";
import { CategoryStatus } from "./CategoryStatus.type";
import { CategoryTrackingMode } from "./CategoryTrackingMode.type";

export interface Category {
  id: string;
  name: string;
  status: CategoryStatus;
  trackingMode: CategoryTrackingMode;
  groupName: Nullable<string>;
}
