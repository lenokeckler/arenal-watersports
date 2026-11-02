import type { NullableRef } from "@/app/types";
import type { ReservationCategoryUnitOption } from "./ReservationCategoryUnitOption.interface";

export interface ReservationEquipmentAvailability {
  availableQuantity: NullableRef<number>;
  availableUnits: ReservationCategoryUnitOption[];
}
