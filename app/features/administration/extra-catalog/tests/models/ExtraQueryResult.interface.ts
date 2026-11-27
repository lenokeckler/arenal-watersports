import type { NullableRef } from "@/app/types";

export interface ExtraQueryResult {
  data?: NullableRef<object>;
  count?: NullableRef<number>;
  error: NullableRef<{ code: string; message: string }>;
}
