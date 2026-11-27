import type { DamageFilters } from "./DamageFilters.interface";
import type { DamageSummary } from "./DamageSummary.interface";

export interface DamageCauseSectionProps {
  filters: DamageFilters;
  summary: DamageSummary;
}
