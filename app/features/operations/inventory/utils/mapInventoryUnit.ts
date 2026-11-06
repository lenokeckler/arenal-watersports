import { INVENTORY_DATA_ERROR } from "../constants/InventoryDataError.constants";
import { INVENTORY_UNIT_STATUS } from "@/app/constants";
import type { InventoryUnit } from "../models/InventoryUnit.interface";
import type { InventoryUnitDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import type { ActiveInventoryUnitStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";

const resolveActiveStatus = (
  status: NullableRef<string>
): ActiveInventoryUnitStatus => {
  const activeStatuses: ActiveInventoryUnitStatus[] = [
    INVENTORY_UNIT_STATUS.AVAILABLE,
    INVENTORY_UNIT_STATUS.DAMAGED,
    INVENTORY_UNIT_STATUS.IN_MAINTENANCE,
    INVENTORY_UNIT_STATUS.IN_REPAIR,
    INVENTORY_UNIT_STATUS.OCCUPIED,
  ];
  const activeStatus = activeStatuses.find(
    (candidate) => candidate === status
  );

  if (!activeStatus) {
    throw new Error(INVENTORY_DATA_ERROR.INVALID_UNIT_ROW);
  }

  return activeStatus;
};

export const mapInventoryUnit = (
  row: InventoryUnitDatabaseRow
): InventoryUnit => {
  if (
    row.recorded_status ===
    INVENTORY_UNIT_STATUS.DECOMMISSIONED
  ) {
    throw new Error(
      INVENTORY_DATA_ERROR.DECOMMISSIONED_UNIT
    );
  }

  if (!row.id || !row.code) {
    throw new Error(INVENTORY_DATA_ERROR.INVALID_UNIT_ROW);
  }

  return {
    id: row.id,
    code: row.code,
    status: resolveActiveStatus(row.effective_status),
  };
};
