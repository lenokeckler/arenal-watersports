import type { NullableRef } from "@/app/types";
import type { DamageReportEntry } from "./DamageReportEntry.interface";
import type { DamageReportsUnit } from "./DamageReportsUnit.interface";

export interface DamageReportsPage {
  entries: DamageReportEntry[];
  hasNextPage: boolean;
  page: number;
  unit: NullableRef<DamageReportsUnit>;
}
