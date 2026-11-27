import { COMBO_AUDIENCE_PRICE_COLUMN } from "../constants/ComboAudienceCurrency.constants";
import type { Combo } from "../models/Combo.interface";
import type { ComboItem } from "../models/ComboItem.interface";
import type { ComboRow } from "../models/ComboRow.type";

const mapItems = (row: ComboRow): ComboItem[] =>
  row.combo_items.map((item) => ({
    categoryName: item.equipment_categories.name,
    quantity: item.quantity,
  }));

export const mapComboRowToCombo = (
  row: ComboRow
): Combo => ({
  audience: row.audience,
  id: row.id,
  items: mapItems(row),
  name: row.name,
  packagePrice:
    row[COMBO_AUDIENCE_PRICE_COLUMN[row.audience]],
  status: row.status,
});
