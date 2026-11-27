import type { Database, NullableRef } from "@/app/types";
import type { DamagePeriod } from "./DamagePeriod.type";
import type { DamageTab } from "./DamageTab.type";

export interface DamageFilters {
  cause: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  day: string;
  isDayOpen: boolean;
  month: string;
  period: DamagePeriod;
  showPending: boolean;
  tab: DamageTab;
}
