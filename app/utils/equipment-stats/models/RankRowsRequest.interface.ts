import type { RankedUnit } from "./RankedUnit.interface";

export interface RankRowsRequest {
  formatValue: (total: number) => string;
  retiredIds: Set<string>;
  units: RankedUnit[];
}
