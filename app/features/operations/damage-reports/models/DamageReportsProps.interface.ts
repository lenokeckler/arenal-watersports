import type { NullableRef } from "@/app/types";
import type { NullableUndefined } from "@/app/types";

export interface DamageReportsProps {
  searchParams?: Record<
    string,
    NullableUndefined<string | string[]>
  >;
  page: number;
  unitId: NullableRef<string>;
}
