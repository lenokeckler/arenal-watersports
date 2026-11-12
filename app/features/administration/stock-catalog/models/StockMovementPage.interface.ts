import type { StockMovementItem } from "./StockMovementItem.interface";

export interface StockMovementPage {
  movements: StockMovementItem[];
  pageCount: number;
}
