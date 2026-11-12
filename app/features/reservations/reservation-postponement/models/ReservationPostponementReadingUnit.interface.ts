import type { NullableRef } from "@/app/types";
import type { ReservationPostponementUsageMetric } from "./ReservationPostponementUsageMetric.type";

export interface ReservationPostponementReadingUnit {
  categoryName: string;
  fuelMax: NullableRef<number>;
  fuelOut: NullableRef<number>;
  itemId: string;
  unitCode: string;
  usageMetric: NullableRef<ReservationPostponementUsageMetric>;
  usageOut: NullableRef<number>;
}
