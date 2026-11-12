import type { StockFormValues } from "@/app/features/administration/stock-catalog/models/StockFormValues.interface";
import { STOCK_ADJUSTMENT_REASON } from "@/app/features/administration/stock-catalog/constants/StockAdjustmentReason.constants";

export const E2E_STOCK_COUNT_BASE_NAME =
  "E2E Fixture â€” Conteo";

export const resolveStockCountFixtureName = (
  projectName: string,
  scenario: string
): string =>
  `${E2E_STOCK_COUNT_BASE_NAME} (${projectName} Â· ${scenario})`;

export const E2E_STOCK_COUNT_SCENARIO = "count-and-discard";

export const E2E_STOCK_HISTORY_INDEX = {
  NEWEST: 0,
} as const;

export const E2E_STOCK_HIDDEN_ROW_COUNT = 0;

export const E2E_STOCK_HISTORY_ROWS = {
  AFTER_DISCARD: 2,
} as const;

export const E2E_PARENT_SELECTOR = "..";

export const E2E_STOCK_INITIAL_COUNT: Pick<
  StockFormValues,
  "available" | "damaged" | "inRepair" | "reason"
> = {
  available: "10",
  damaged: "2",
  inRepair: "1",
  reason: STOCK_ADJUSTMENT_REASON.INITIAL_COUNT,
};

export const E2E_STOCK_AFTER_DISCARD = {
  available: "8",
  reason: STOCK_ADJUSTMENT_REASON.DISCARDED,
} as const;

export const E2E_STOCK_TOTALS = {
  AFTER_DISCARD: 11,
  AFTER_INITIAL_COUNT: 13,
  BEFORE_INITIAL_COUNT: 0,
} as const;

export const E2E_STOCK_AVAILABLE = {
  AFTER_DISCARD: 8,
  AFTER_INITIAL_COUNT: 10,
} as const;

export const E2E_STOCK_UNCHANGED = {
  DAMAGED: 2,
  IN_REPAIR: 1,
} as const;
