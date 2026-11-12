import type { NullableRef } from "@/app/types";
import type { DamageReportEntry } from "./DamageReportEntry.interface";
import type { DamageReportsUnit } from "./DamageReportsUnit.interface";

export interface DamageReportsViewProps {
  entries: DamageReportEntry[];
  errorMessage: NullableRef<string>;
  hasNextPage: boolean;
  page: number;
  unit: NullableRef<DamageReportsUnit>;
}
