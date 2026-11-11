import type { NullableRef } from "@/app/types";

export interface CategoryAlertThresholds {
  alertExpiryDays: NullableRef<number>;
  alertMinQuantity: NullableRef<number>;
}
