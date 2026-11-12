import type { DispatchUsageMetric } from "@/app/components/dispatch-board/models/DispatchUsageMetric.type";
import type { NullableRef } from "@/app/types";

export interface GroupReturnUnit {
  code: string;
  consumesFuel: boolean;
  fuelMax: number;
  fuelOut: NullableRef<number>;
  unitId: string;
  usageMetric: NullableRef<DispatchUsageMetric>;
  usageOut: NullableRef<number>;
}
