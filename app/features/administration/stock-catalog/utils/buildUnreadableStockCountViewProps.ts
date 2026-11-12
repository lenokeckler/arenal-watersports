import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";
import { STOCK_CATEGORY_TRACKING_MODE } from "../constants/StockCategoryTrackingMode.constants";
import { STOCK_EMPTY_LEVELS } from "../constants/StockEmptyLevels.constants";
import type { StockCountViewProps } from "../models/StockCountViewProps.interface";

export const buildUnreadableStockCountViewProps = (
  categoryId: string,
  currentPage: number
): StockCountViewProps => ({
  category: {
    hasExpiryAlert: false,
    id: categoryId,
    name: STOCK_COUNT_COPY.UNREADABLE_CATEGORY_NAME,
    trackingMode: STOCK_CATEGORY_TRACKING_MODE.BY_QUANTITY,
  },
  currentPage,
  fetchFailed: true,
  levels: STOCK_EMPTY_LEVELS,
  movements: [],
  pageCount: 0,
});
