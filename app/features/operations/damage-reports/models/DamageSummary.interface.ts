import type { CauseCounts } from "@/app/components/cause-chart/models/CauseCounts.type";
import type { RankedUnit } from "@/app/utils/equipment-stats/models/RankedUnit.interface";

export interface DamageSummary {
  causeCounts: CauseCounts;
  hasPendingInPeriod: boolean;
  periodTotal: number;
  topUnits: RankedUnit[];
}
