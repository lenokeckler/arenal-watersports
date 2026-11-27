import type { Database, NullableRef } from "@/app/types";

export interface BoardUnitReceiveInput {
  damageCause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  damageDescription: string;
  detailLater: boolean;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  hasDamage: boolean;
  impactCount: number;
  previousImpactCount: number;
  unitId: string;
  usageTotal: NullableRef<number>;
}
