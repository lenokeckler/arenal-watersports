import type { CustomComboEquipmentSelection } from "../models/CustomComboEquipmentSelection.interface";
import type { CustomComboRpcItem } from "../models/CustomComboRpcItem.interface";

export const mapCustomComboRpcItems = (
  selections: CustomComboEquipmentSelection[]
): CustomComboRpcItem[] =>
  selections.map((selection) => ({
    category_id: selection.categoryId,
    quantity: selection.quantity,
  }));
