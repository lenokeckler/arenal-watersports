import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";
import type { CategoryUnitAction } from "./CategoryUnitAction.type";

export interface CategoryUnitActionRowProps {
  action: CategoryUnitAction;
  image: NullableRef<ReservationEquipmentImageOption>;
  onAction: (unitId: string) => void;
  unit: CategoryUnit;
}
