import type { NullableRef } from "@/app/types";
import type { ReservationPostponementUsageMetric } from "./ReservationPostponementUsageMetric.type";

export interface ReservationPostponementCategoryRow {
  consumes_fuel: boolean;
  name: string;
  usage_metric: NullableRef<ReservationPostponementUsageMetric>;
}
