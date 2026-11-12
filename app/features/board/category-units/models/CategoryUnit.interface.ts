import type { ActiveInventoryUnitStatus } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { UnitOccupancy } from "./UnitOccupancy.interface";

export interface CategoryUnit {
  code: string;
  id: string;
  occupancy: NullableRef<UnitOccupancy>;
  status: ActiveInventoryUnitStatus;
}
