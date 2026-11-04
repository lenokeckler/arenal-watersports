import { STOCK_COUNT_VIEW_STATE } from "../constants/StockCountViewState.constants";

export type StockCountViewState =
  (typeof STOCK_COUNT_VIEW_STATE)[keyof typeof STOCK_COUNT_VIEW_STATE];
