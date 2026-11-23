import type { NullableRef } from "@/app/types";

export interface DispatchUnitFuelRow {
  code: string;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  lowFuelLines: number;
  unitId: string;
}
