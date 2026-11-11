import type { Database } from "@/app/types";
import type { NullableRef } from "@/app/types";

export interface MaintenanceUnit {
  categoryId: string;
  categoryName: string;
  code: string;
  nextOilChangeAt: NullableRef<number>;
  oilOverage: NullableRef<number>;
  status: Database["public"]["Enums"]["unit_status"];
  unitId: string;
  usageMetric: NullableRef<
    Database["public"]["Enums"]["usage_metric"]
  >;
  usageTotal: number;
}
