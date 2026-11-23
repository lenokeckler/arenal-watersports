import type { ActiveInventoryUnitStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { CategoryUnitReadings } from "./CategoryUnitReadings.interface";
import type { UnitOccupancy } from "./UnitOccupancy.interface";

export interface CategoryUnit {
  code: string;
  id: string;
  occupancy: NullableRef<UnitOccupancy>;
  readings: NullableRef<CategoryUnitReadings>;
  status: ActiveInventoryUnitStatus;
}
