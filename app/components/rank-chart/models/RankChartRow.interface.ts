import type { NullableRef } from "@/app/types";

export interface RankChartRow {
  amount: number;
  href: NullableRef<string>;
  key: string;
  label: string;
  valueText: string;
}
