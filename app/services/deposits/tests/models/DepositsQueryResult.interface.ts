import type { NullableRef } from "@/app/types";

export interface DepositsQueryResult {
  data: unknown;
  error: unknown;
  count?: NullableRef<number>;
}
