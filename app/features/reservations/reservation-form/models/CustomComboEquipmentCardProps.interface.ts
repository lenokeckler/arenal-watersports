import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { NullableUndefined } from "@/app/types";

export interface CustomComboEquipmentCardProps {
  category: ReservationCategoryOption;
  selection: NullableUndefined<CustomComboEquipmentSelection>;
  onAdd: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
}
