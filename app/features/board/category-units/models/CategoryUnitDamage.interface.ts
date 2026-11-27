import type { NullableRef } from "@/app/types";

export interface CategoryUnitDamage {
  cause: NullableRef<string>;
  description: NullableRef<string>;
  reportedAt: string;
}
