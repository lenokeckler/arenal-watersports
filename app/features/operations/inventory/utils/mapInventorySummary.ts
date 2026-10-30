import {
  INVENTORY_TRACKING_MODE,
  type InventoryTrackingMode,
} from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { INVENTORY_DATA_ERROR } from "../constants/InventoryDataError.constants";
import type { InventoryCategorySummary } from "../models/InventoryCategorySummary.interface";
import type { InventorySummaryDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";

const requireSummaryValue = <TValue>(
  value: NullableRef<TValue>
): TValue => {
  if (value === null) {
    throw new Error(
      INVENTORY_DATA_ERROR.INVALID_SUMMARY_ROW
    );
  }

  return value;
};

const resolveTrackingMode = (
  trackingMode: InventorySummaryDatabaseRow["tracking_mode"]
): InventoryTrackingMode => {
  if (
    trackingMode !== INVENTORY_TRACKING_MODE.BY_QUANTITY &&
    trackingMode !== INVENTORY_TRACKING_MODE.BY_UNIT
  ) {
    throw new Error(
      INVENTORY_DATA_ERROR.INVALID_SUMMARY_ROW
    );
  }

  return trackingMode;
};

export const mapInventorySummary = (
  row: InventorySummaryDatabaseRow
): InventoryCategorySummary => ({
  id: requireSummaryValue(row.category_id),
  name: requireSummaryValue(row.category_name),
  trackingMode: resolveTrackingMode(row.tracking_mode),
  available: requireSummaryValue(row.quantity_available),
  damaged: requireSummaryValue(row.quantity_damaged),
  inMaintenance: requireSummaryValue(
    row.quantity_in_maintenance
  ),
  inRepair: requireSummaryValue(row.quantity_in_repair),
  total: requireSummaryValue(row.quantity_total),
});
