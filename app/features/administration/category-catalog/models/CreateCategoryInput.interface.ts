import { CategoryTrackingMode } from "./CategoryTrackingMode.type";

export interface CreateCategoryInput {
  name: string;
  trackingMode: CategoryTrackingMode;
  groupName: string;
}
