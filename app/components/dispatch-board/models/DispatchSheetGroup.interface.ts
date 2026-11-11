import type { DispatchCandidateUnit } from "./DispatchCandidateUnit.interface";

export interface DispatchSheetGroup {
  candidateUnits: DispatchCandidateUnit[];
  categoryId: string;
  categoryName: string;
  durationMinutes: number;
  fixedUnitIds: string[];
  hasMotor: boolean;
  isTrackedByUnit: boolean;
  requiredQuantity: number;
}
