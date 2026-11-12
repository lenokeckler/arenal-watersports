import type { CustomComboEquipmentSelection } from "./CustomComboEquipmentSelection.interface";
import type { NullableRef } from "@/app/types";

export interface CustomComboPricingInput {
  durationHours: number;
  extraIds: string[];
  extraUnitId: NullableRef<string>;
  items: CustomComboEquipmentSelection[];
}
