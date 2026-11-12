import type { NullableRef } from "@/app/types";
import type { DispatchCandidateUnit } from "./DispatchCandidateUnit.interface";
import type { DispatchUsageMetric } from "./DispatchUsageMetric.type";

export interface DispatchSheetGroup {
  candidateUnits: DispatchCandidateUnit[];
  categoryId: string;
  categoryName: string;
  consumesFuel: boolean;
  durationMinutes: number;
  fixedUnitIds: string[];
  hasMotor: boolean;
  isTrackedByUnit: boolean;
  requiredQuantity: number;
  usageMetric: NullableRef<DispatchUsageMetric>;
}
