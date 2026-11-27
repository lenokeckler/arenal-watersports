import type { NullableRef } from "@/app/types";
import type { DamageFilters } from "./DamageFilters.interface";
import type { DamageOverview } from "./DamageOverview.interface";

export interface DamageReportsViewProps {
  errorMessage: NullableRef<string>;
  filters: DamageFilters;
  overview: DamageOverview;
  savedMessage: NullableRef<string>;
}
