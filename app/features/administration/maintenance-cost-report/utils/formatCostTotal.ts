import {
  MAINTENANCE_COST_COPY,
  MAINTENANCE_COST_CURRENCY_SYMBOL,
} from "../constants/MaintenanceCostReportCopy.constants";
import type { UnitMaintenanceCost } from "../models/UnitMaintenanceCost.interface";

const getSymbol = (currency: string): string =>
  currency in MAINTENANCE_COST_CURRENCY_SYMBOL
    ? MAINTENANCE_COST_CURRENCY_SYMBOL[
        currency as keyof typeof MAINTENANCE_COST_CURRENCY_SYMBOL
      ]
    : `${currency} `;

export const formatCostTotal = (
  cost: UnitMaintenanceCost
): string =>
  cost.totals
    .map(
      (item) =>
        `${MAINTENANCE_COST_COPY.TOTAL_PREFIX}${getSymbol(item.currency)}${item.total.toLocaleString("en-US")}`
    )
    .join(MAINTENANCE_COST_COPY.PART_SEPARATOR);
