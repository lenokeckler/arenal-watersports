import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import type { CategoryUnit } from "./CategoryUnit.interface";
import type { CategoryUnitInteraction } from "./CategoryUnitInteraction.interface";
import type { CategoryUnitSelection } from "./CategoryUnitSelection.interface";

export interface CategoryUnitsListProps {
  image: NullableRef<ReservationEquipmentImageOption>;
  categoryName: string;
  interaction?: CategoryUnitInteraction;
  selection?: CategoryUnitSelection;
  units: CategoryUnit[];
}
