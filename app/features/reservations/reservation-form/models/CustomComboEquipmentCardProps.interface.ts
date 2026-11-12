import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { NullableUndefined } from "@/app/types";

export interface CustomComboEquipmentCardProps {
  category: ReservationCategoryOption;
  date: string;
  durationHours: number;
  selection: NullableUndefined<CustomComboEquipmentSelection>;
  time: string;
  onUnitChange: (unitId: string) => void;
  onRemove: () => void;
  onAdd: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
}
