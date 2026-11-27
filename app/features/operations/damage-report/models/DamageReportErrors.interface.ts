import type { NullableRef } from "@/app/types";

export interface DamageReportErrors {
  cause: NullableRef<string>;
  description: NullableRef<string>;
  unit: NullableRef<string>;
}
