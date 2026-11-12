import { INVENTORY_COUNT_HISTORY_DATE_FORMAT } from "../constants/InventoryCountHistory.constants";

export const formatInventoryCountDate = (
  countedAt: string
): string =>
  new Intl.DateTimeFormat(
    INVENTORY_COUNT_HISTORY_DATE_FORMAT.locale,
    INVENTORY_COUNT_HISTORY_DATE_FORMAT.options
  ).format(new Date(countedAt));
