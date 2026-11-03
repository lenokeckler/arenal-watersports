import type { StockCategoryTrackingMode } from "../constants/StockCategoryTrackingMode.constants";

export interface StockCategory {
  hasExpiryAlert: boolean;
  id: string;
  name: string;
  trackingMode: StockCategoryTrackingMode;
}
