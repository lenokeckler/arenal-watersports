import type { NullableRef } from "@/app/types";

export interface UpdateCategoryAlertsInput {
  categoryId: string;
  alertMinQuantity: NullableRef<number>;
  alertExpiryDays: NullableRef<number>;
}
