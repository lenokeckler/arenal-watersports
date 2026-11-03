import { STOCK_ADJUSTMENT_REASON } from "./StockAdjustmentReason.constants";

export const STOCK_REASON_COPY: Record<string, string> = {
  [STOCK_ADJUSTMENT_REASON.COUNT_CORRECTION]:
    "Corrección de conteo",
  [STOCK_ADJUSTMENT_REASON.DISCARDED]: "Botado",
  [STOCK_ADJUSTMENT_REASON.INITIAL_COUNT]: "Conteo inicial",
  [STOCK_ADJUSTMENT_REASON.LOST]: "Perdido",
};
