import type { ExtraCompatibilityUnitOption } from "./ExtraCompatibilityUnitOption.interface";

export interface ExtraCompatibilityBoatGroup {
  id: string;
  isOpen: boolean;
  markedCount: number;
  name: string;
  onClearAll: () => void;
  onSelectAll: () => void;
  onToggleOpen: () => void;
  onToggleUnit: (unitId: string) => void;
  options: ExtraCompatibilityUnitOption[];
  progressLabel: string;
}
