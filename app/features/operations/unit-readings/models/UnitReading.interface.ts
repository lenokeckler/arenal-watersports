import type { Database, NullableRef } from "@/app/types";

export interface UnitReading {
  categoryName: string;
  code: string;
  fuelLevel: NullableRef<number>;
  fuelMax: number;
  id: string;
  impactCount: number;
  nextOilChangeAt: NullableRef<number>;
  status: Database["public"]["Enums"]["unit_status"];
  usageMetric: NullableRef<
    Database["public"]["Enums"]["usage_metric"]
  >;
  usageTotal: number;
}
