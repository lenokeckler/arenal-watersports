import { STRING } from "@/app/constants";
import { STOCK_COUNT_COPY } from "../constants/StockCountCopy.constants";

export const formatStockValueChange = (
  from: number,
  to: number
): string =>
  from === to
    ? `${to}`
    : [from, STOCK_COUNT_COPY.MOVEMENT_ARROW, to].join(
        STRING.SPACE
      );
