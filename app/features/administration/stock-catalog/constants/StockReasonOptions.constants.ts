import type { StockSelectOption } from "../models/StockSelectOption.interface";
import { STOCK_ADJUSTMENT_REASON } from "./StockAdjustmentReason.constants";
import { STOCK_REASON_COPY } from "./StockReasonCopy.constants";

export const STOCK_REASON_OPTIONS: StockSelectOption[] =
  Object.values(STOCK_ADJUSTMENT_REASON).map((reason) => ({
    key: reason,
    label: STOCK_REASON_COPY[reason],
    value: reason,
  }));
