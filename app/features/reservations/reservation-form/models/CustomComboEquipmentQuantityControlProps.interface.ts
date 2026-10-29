import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";

export interface CustomComboEquipmentQuantityControlProps {
  categoryName: string;
  onDecrease: () => void;
  onIncrease: () => void;
  quantity: CustomComboEquipmentSelection["quantity"];
}
