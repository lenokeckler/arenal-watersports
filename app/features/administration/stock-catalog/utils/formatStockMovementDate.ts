import { STOCK_MOVEMENT_DATE_FORMAT } from "../constants/StockMovementDateFormat.constants";

export const formatStockMovementDate = (
  createdAt: string
): string =>
  new Intl.DateTimeFormat(
    STOCK_MOVEMENT_DATE_FORMAT.LOCALE,
    STOCK_MOVEMENT_DATE_FORMAT.OPTIONS
  ).format(new Date(createdAt));
