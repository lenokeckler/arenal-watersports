import type { DamageFilters } from "./DamageFilters.interface";
import type { DamageOverview } from "./DamageOverview.interface";

export interface DamageSectionProps {
  filters: DamageFilters;
  overview: DamageOverview;
}
