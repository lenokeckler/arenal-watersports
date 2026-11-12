import type { Database, NullableRef } from "@/app/types";

export interface MaintenanceJobUnit {
  categoryName: string;
  code: string;
  unitId: string;
  usageMetric: NullableRef<
    Database["public"]["Enums"]["usage_metric"]
  >;
  usageTotal: number;
}
