import type { NullableRef } from "@/app/types";

export interface BoardUnitReceiveInput {
  damageDescription: string;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  hasDamage: boolean;
  impactCount: number;
  previousImpactCount: number;
  unitId: string;
  usageTotal: NullableRef<number>;
}
