import type {
  EquipmentHoursCategory,
  EquipmentHoursUnit,
} from "./EquipmentHours.interface";

export interface EquipmentHoursCategorySectionProps {
  category: EquipmentHoursCategory;
}

export interface EquipmentHoursRowProps {
  largestHours: number;
  unit: EquipmentHoursUnit;
}
