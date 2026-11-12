import type { NullableRef } from "@/app/types";
import type { DispatchUnitReadingRow } from "./DispatchUnitReadingRow.interface";
import type { DispatchUsageMetric } from "./DispatchUsageMetric.type";

export interface DispatchUnitReadingCardProps {
  consumesFuel: boolean;
  onFuelChange: (unitId: string, text: string) => void;
  onUsageChange: (unitId: string, text: string) => void;
  row: DispatchUnitReadingRow;
  usageMetric: NullableRef<DispatchUsageMetric>;
}
