import { MAINTENANCE_HISTORY_COPY } from "../constants/MaintenanceHistoryCopy.constants";
import type { MaintenanceHistoryEntry } from "../models/MaintenanceHistoryEntry.interface";
import { formatJobDate } from "./formatJobDate";

export const getEntryDetailText = (
  entry: MaintenanceHistoryEntry
): string => {
  const cost =
    entry.costAmount === null
      ? MAINTENANCE_HISTORY_COPY.NO_COST
      : `${MAINTENANCE_HISTORY_COPY.COST_PREFIX}${entry.costAmount} ${entry.costCurrency}`;

  return [
    formatJobDate(entry.performedAt),
    cost,
    entry.isExternal
      ? MAINTENANCE_HISTORY_COPY.EXTERNAL
      : null,
  ]
    .filter((part) => part !== null)
    .join(MAINTENANCE_HISTORY_COPY.PART_SEPARATOR);
};
