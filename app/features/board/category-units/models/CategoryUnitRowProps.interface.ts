import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";

export interface CategoryUnitRowProps {
  image: NullableRef<ReservationEquipmentImageOption>;
  isEditable?: boolean;
  isSelected?: boolean;
  unit: CategoryUnit;
}
