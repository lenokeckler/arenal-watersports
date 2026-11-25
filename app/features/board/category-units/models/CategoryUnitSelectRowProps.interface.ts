import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitSelectRowProps {
  image: NullableRef<ReservationEquipmentImageOption>;
  isSelected: boolean;
  onToggle: (unitId: string) => void;
  unit: CategoryUnit;
}
