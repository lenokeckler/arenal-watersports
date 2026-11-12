import { STOCK_ADJUSTMENT_REASON } from "../constants/StockAdjustmentReason.constants";
import { STOCK_CATEGORY_TRACKING_MODE } from "../constants/StockCategoryTrackingMode.constants";
import type { AdjustStockInput } from "../models/AdjustStockInput.interface";
import type { StockAdjustmentContext } from "../models/StockAdjustmentContext.interface";
import type { StockCategory } from "../models/StockCategory.interface";
import type { StockCategoryRow } from "../models/StockCategoryRow.type";
import type { StockLevels } from "../models/StockLevels.interface";
import type { StockMovementItem } from "../models/StockMovementItem.interface";
import type { StockMovementRow } from "../models/StockMovementRow.type";

export const FAKE_STOCK_CATEGORY_ID =
  "fake-stock-category-id";
export const FAKE_STOCK_ADMIN_WORKER_ID =
  "fake-stock-admin-id";
export const FAKE_EXPIRY_DATE = "2027-03-15";
export const FAKE_IMPOSSIBLE_EXPIRY_DATE = "2027-02-30";
export const FAKE_MALFORMED_EXPIRY_DATE = "15/03/2027";
export const INVALID_QUANTITIES = [-1, 1.5, Number.NaN];

export const DEFAULT_STOCK_LEVELS: StockLevels = {
  available: 10,
  damaged: 2,
  expiryDate: null,
  inRepair: 1,
};

export const DEFAULT_ADJUST_STOCK_INPUT: AdjustStockInput =
  {
    available: 8,
    categoryId: FAKE_STOCK_CATEGORY_ID,
    damaged: 2,
    expiryDate: null,
    inRepair: 1,
    reason: STOCK_ADJUSTMENT_REASON.LOST,
  };

export const DEFAULT_STOCK_ADJUSTMENT_CONTEXT: StockAdjustmentContext =
  {
    currentLevels: DEFAULT_STOCK_LEVELS,
    hasExpiryAlert: false,
  };

export const DEFAULT_STOCK_CATEGORY_ROW: StockCategoryRow =
  {
    alert_expiry_days: 30,
    id: FAKE_STOCK_CATEGORY_ID,
    name: "Chalecos",
    tracking_mode: STOCK_CATEGORY_TRACKING_MODE.BY_QUANTITY,
  };

export const DEFAULT_STOCK_CATEGORY: StockCategory = {
  hasExpiryAlert: true,
  id: FAKE_STOCK_CATEGORY_ID,
  name: "Chalecos",
  trackingMode: STOCK_CATEGORY_TRACKING_MODE.BY_QUANTITY,
};

export const DEFAULT_STOCK_MOVEMENT_ROW: StockMovementRow =
  {
    created_at: "2026-11-01T15:00:00.000Z",
    from_available: 10,
    from_damaged: 2,
    from_in_repair: 1,
    id: "fake-movement-id",
    reason: STOCK_ADJUSTMENT_REASON.LOST,
    to_available: 8,
    to_damaged: 2,
    to_in_repair: 1,
  };

export const DEFAULT_STOCK_MOVEMENT_ITEM: StockMovementItem =
  {
    availableFrom: 10,
    availableTo: 8,
    createdAt: "2026-11-01T15:00:00.000Z",
    damagedFrom: 2,
    damagedTo: 2,
    id: "fake-movement-id",
    inRepairFrom: 1,
    inRepairTo: 1,
    reason: STOCK_ADJUSTMENT_REASON.LOST,
    totalFrom: 13,
    totalTo: 11,
  };
