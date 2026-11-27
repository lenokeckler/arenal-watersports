import type { Database, NullableRef } from "@/app/types";
import type { CauseCounts } from "./CauseCounts.type";

export interface CauseChartProps {
  counts: CauseCounts;
  currentCause?: NullableRef<
    Database["public"]["Enums"]["damage_cause"]
  >;
  label: string;
  resolveHref: (
    cause: Database["public"]["Enums"]["damage_cause"]
  ) => string;
}
