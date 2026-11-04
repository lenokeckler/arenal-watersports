import { CATEGORY_STATUS } from "../constants/CategoryStatus.constants";

export type CategoryStatus =
  (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];
