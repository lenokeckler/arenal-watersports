import { INVENTORY_COUNT_QUANTITY_FIELD_KEY } from "../constants/InventoryCountHistory.constants";
import type {
  InventoryCountDifferences,
  InventoryCountQuantityChange,
} from "../models/InventoryCountDifferences.interface";
import type { InventoryCountLineRow } from "../models/InventoryCountLineRow.interface";

const buildQuantityChanges = (
  row: InventoryCountLineRow
): InventoryCountQuantityChange[] => {
  const pairs: [
    InventoryCountQuantityChange["field"],
    number | null,
    number | null,
  ][] = [
    [
      INVENTORY_COUNT_QUANTITY_FIELD_KEY.AVAILABLE,
      row.system_quantity_available,
      row.quantity_available,
    ],
    [
      INVENTORY_COUNT_QUANTITY_FIELD_KEY.DAMAGED,
      row.system_quantity_damaged,
      row.quantity_damaged,
    ],
    [
      INVENTORY_COUNT_QUANTITY_FIELD_KEY.IN_REPAIR,
      row.system_quantity_in_repair,
      row.quantity_in_repair,
    ],
  ];

  return pairs.flatMap(([field, system, counted]) =>
    system !== null &&
    counted !== null &&
    system !== counted
      ? [{ counted, field, system }]
      : []
  );
};

export const buildInventoryCountDifferences = (
  rows: InventoryCountLineRow[]
): InventoryCountDifferences => {
  const differences: InventoryCountDifferences = {
    quantityDifferences: [],
    unitDifferences: [],
  };

  for (const row of rows) {
    const categoryName = row.category?.name ?? "";

    if (row.unit_id !== null) {
      if (
        row.system_status !== null &&
        row.confirmed_status !== null &&
        row.system_status !== row.confirmed_status
      ) {
        differences.unitDifferences.push({
          categoryName,
          code: row.unit?.code ?? "",
          countedStatus: row.confirmed_status,
          systemStatus: row.system_status,
        });
      }
    } else {
      const changes = buildQuantityChanges(row);

      if (changes.length > 0) {
        differences.quantityDifferences.push({
          categoryName,
          changes,
        });
      }
    }
  }

  differences.unitDifferences.sort((first, second) =>
    first.code.localeCompare(second.code)
  );
  differences.quantityDifferences.sort((first, second) =>
    first.categoryName.localeCompare(second.categoryName)
  );

  return differences;
};
