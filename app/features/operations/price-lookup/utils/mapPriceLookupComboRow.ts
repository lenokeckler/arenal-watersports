import { PRICE_LOOKUP_COMBO_PRICE_COLUMN } from "../constants/PriceLookupComboPriceColumn.constants";
import type { PriceLookupCombo } from "../models/PriceLookupCombo.interface";
import type { PriceLookupComboRow } from "../models/PriceLookupComboRow.type";

export const mapPriceLookupComboRow = (
  row: PriceLookupComboRow
): PriceLookupCombo => ({
  audience: row.audience,
  id: row.id,
  items: row.combo_items.map((item) => ({
    categoryName: item.equipment_categories.name,
    quantity: item.quantity,
  })),
  name: row.name,
  packagePrice:
    row[PRICE_LOOKUP_COMBO_PRICE_COLUMN[row.audience]],
});
