import type { NullableRef } from "@/app/types";

export interface UnitMotorFields {
  fuelMax: number;
  fuelLevel: NullableRef<number>;
  lowFuelLines: NullableRef<number>;
  usageTotal: number;
  nextOilChangeAt: NullableRef<number>;
}
