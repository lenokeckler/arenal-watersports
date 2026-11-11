import type { StockCategory } from "./StockCategory.interface";
import type { StockLevels } from "./StockLevels.interface";
import type { StockMovementItem } from "./StockMovementItem.interface";

export interface StockCountViewModelProps {
  category: StockCategory;
  fetchFailed: boolean;
  levels: StockLevels;
  movements: StockMovementItem[];
}
