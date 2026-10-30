import { INVENTORY_TRACKING_MODE } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { InventoryCategoryDetails } from "../models/InventoryCategoryDetails.type";
import type { InventoryPage } from "../models/InventoryPage.model";
import type { InventoryCategoryDatabaseDetails } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import { mapInventorySummary } from "./mapInventorySummary";
import { mapInventoryUnit } from "./mapInventoryUnit";

const mapUnitPage = (
  units: InventoryCategoryDatabaseDetails["units"]
): InventoryPage<ReturnType<typeof mapInventoryUnit>> => ({
  ...units,
  items: units.items.map(mapInventoryUnit),
});

export const mapInventoryCategoryDetails = (
  details: InventoryCategoryDatabaseDetails
): NullableRef<InventoryCategoryDetails> => {
  if (!details.summary) {
    return null;
  }

  const category = mapInventorySummary(details.summary);

  if (
    category.trackingMode ===
    INVENTORY_TRACKING_MODE.BY_UNIT
  ) {
    return {
      category: {
        ...category,
        trackingMode: INVENTORY_TRACKING_MODE.BY_UNIT,
      },
      units: mapUnitPage(details.units),
    };
  }

  return {
    category: {
      ...category,
      trackingMode: INVENTORY_TRACKING_MODE.BY_QUANTITY,
    },
  };
};
