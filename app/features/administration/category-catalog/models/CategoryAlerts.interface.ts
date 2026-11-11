import type { NullableRef } from "@/app/types";

export interface CategoryAlerts {
  id: string;
  alertMinQuantity: NullableRef<number>;
  alertExpiryDays: NullableRef<number>;
}
