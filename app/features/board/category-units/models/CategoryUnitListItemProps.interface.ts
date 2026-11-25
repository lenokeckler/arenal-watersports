import type { ReservationEquipmentImageOption } from "@/app/components/reservation-calendar/models/ReservationEquipmentImageOption.interface";
import type { NullableRef } from "@/app/types";
import { CATEGORY_UNIT_ROW_KIND } from "../constants/CategoryUnits.constants";
import type { CategoryUnit } from "./CategoryUnit.interface";
import type { CategoryUnitInteraction } from "./CategoryUnitInteraction.interface";
import type { CategoryUnitSelection } from "./CategoryUnitSelection.interface";

export interface CategoryUnitListItemProps {
  image: NullableRef<ReservationEquipmentImageOption>;
  interaction?: CategoryUnitInteraction;
  kind: (typeof CATEGORY_UNIT_ROW_KIND)[keyof typeof CATEGORY_UNIT_ROW_KIND];
  selection?: CategoryUnitSelection;
  unit: CategoryUnit;
}
