import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { NullableUndefined } from "@/app/types";
import type { NullableRef } from "@/app/types";

export interface CustomComboEquipmentCardProps {
  category: ReservationCategoryOption;
  date: string;
  durationHours: number;
  selection: NullableUndefined<CustomComboEquipmentSelection>;
  time: string;
  extraIds: string[];
  extraUnitId: NullableRef<string>;
  onExtraToggle: (unitId: string, extraId: string) => void;
  onUnitChange: (unitId: string) => void;
  onRemove: () => void;
  onAdd: () => void;
  onDecrease: () => void;
  onIncrease: () => void;
}
