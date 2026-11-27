import type { CauseCounts } from "./CauseCounts.type";

export interface CauseChartRowProps {
  cause: keyof CauseCounts;
  count: number;
  highest: number;
  href: string;
  isCurrent: boolean;
}
