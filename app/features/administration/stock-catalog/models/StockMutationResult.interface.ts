import type { StockMutationStatus } from "../constants/StockMutationStatus.constants";

export interface StockMutationResult {
  message?: string;
  status: StockMutationStatus;
}
