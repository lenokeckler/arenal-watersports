import type { StockCategory } from "./StockCategory.interface";
import type { StockLevels } from "./StockLevels.interface";
import type { StockMovementItem } from "./StockMovementItem.interface";

export interface StockCountViewProps {
  category: StockCategory;
  currentPage: number;
  fetchFailed: boolean;
  levels: StockLevels;
  movements: StockMovementItem[];
  pageCount: number;
}
