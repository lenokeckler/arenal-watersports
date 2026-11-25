import type { DispatchSheetGroup } from "./DispatchSheetGroup.interface";

export interface DispatchUnitGridProps {
  group: DispatchSheetGroup;
  onToggle: (unitId: string) => void;
  selectedUnitIds: string[];
  targetCount: number;
}
