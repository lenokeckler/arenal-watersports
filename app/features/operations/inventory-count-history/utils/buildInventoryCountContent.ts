import { INVENTORY_COUNT_QUANTITY_FIELD_KEY } from "../constants/InventoryCountHistory.constants";
import type {
  InventoryCountContentCategory,
  InventoryCountContentQuantity,
} from "../models/InventoryCountContent.interface";
import type { InventoryCountLineRow } from "../models/InventoryCountLineRow.interface";

const buildQuantities = (
  row: InventoryCountLineRow
): InventoryCountContentQuantity[] =>
  [
    [
      INVENTORY_COUNT_QUANTITY_FIELD_KEY.AVAILABLE,
      row.quantity_available,
      row.system_quantity_available,
    ],
    [
      INVENTORY_COUNT_QUANTITY_FIELD_KEY.DAMAGED,
      row.quantity_damaged,
      row.system_quantity_damaged,
    ],
    [
      INVENTORY_COUNT_QUANTITY_FIELD_KEY.IN_REPAIR,
      row.quantity_in_repair,
      row.system_quantity_in_repair,
    ],
  ].flatMap(([field, counted, system]) =>
    typeof field === "string" && typeof counted === "number"
      ? [
          {
            counted,
            differs:
              typeof system === "number" &&
              system !== counted,
            field,
            system:
              typeof system === "number" ? system : null,
          },
        ]
      : []
  );

export const buildInventoryCountContent = (
  rows: InventoryCountLineRow[]
): InventoryCountContentCategory[] => {
  const categories = new Map<
    string,
    InventoryCountContentCategory
  >();

  for (const row of rows) {
    const name = row.category?.name ?? "";
    const category = categories.get(name) ?? {
      differenceCount: 0,
      name,
      quantities: [],
      units: [],
    };

    if (
      row.unit_id !== null &&
      row.confirmed_status !== null
    ) {
      const differs =
        row.system_status !== null &&
        row.system_status !== row.confirmed_status;

      category.units.push({
        code: row.unit?.code ?? "",
        countedStatus: row.confirmed_status,
        differs,
        systemStatus: row.system_status,
      });
      category.differenceCount += differs ? 1 : 0;
    } else {
      const quantities = buildQuantities(row);

      category.quantities.push(...quantities);
      category.differenceCount += quantities.some(
        (quantity) => quantity.differs
      )
        ? 1
        : 0;
    }

    categories.set(name, category);
  }

  return [...categories.values()]
    .map((category) => ({
      ...category,
      units: [...category.units].sort((first, second) =>
        first.code.localeCompare(second.code)
      ),
    }))
    .sort((first, second) =>
      first.name.localeCompare(second.name)
    );
};
