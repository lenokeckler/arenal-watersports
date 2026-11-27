import { COMBO_AUDIENCE_PRICE_COLUMN } from "../constants/ComboAudienceCurrency.constants";
import type { ComboForEdit } from "../models/ComboForEdit.interface";
import type { ComboForEditRow } from "../models/ComboForEditRow.type";

export const mapComboRowToComboForEdit = (
  row: ComboForEditRow
): ComboForEdit => ({
  audience: row.audience,
  id: row.id,
  items: row.combo_items.map((item) => ({
    categoryId: item.category_id,
    quantity: item.quantity,
  })),
  name: row.name,
  packagePrice:
    row[COMBO_AUDIENCE_PRICE_COLUMN[row.audience]],
});
