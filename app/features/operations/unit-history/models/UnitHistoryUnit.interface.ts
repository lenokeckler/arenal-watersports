import type { Database, NullableRef } from "@/app/types";

export interface UnitHistoryUnit {
  categoryName: string;
  code: string;
  hasPhotos: boolean;
  id: string;
  impactCount: number;
  nextOilChangeAt: NullableRef<number>;
  status: Database["public"]["Enums"]["unit_status"];
  usageMetric: NullableRef<
    Database["public"]["Enums"]["usage_metric"]
  >;
  usageTotal: number;
}
