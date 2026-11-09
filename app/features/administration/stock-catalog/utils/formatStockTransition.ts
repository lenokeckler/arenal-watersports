import { STRING } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";

export const formatStockTransition = (
  label: string,
  from: number,
  to: number
): string =>
  `${label}${STRING.COLON} ${from} ${STOCK_COUNT_COPY.MOVEMENT_ARROW} ${to}`;
