import type { ExtraCompatibilityUnitOption } from "./ExtraCompatibilityUnitOption.interface";
import type { ExtraCompatibilityUnitsSubmitViewModel } from "./ExtraCompatibilityUnitsSubmitViewModel.interface";

export interface ExtraCompatibilityUnitsFormViewModel extends ExtraCompatibilityUnitsSubmitViewModel {
  hasChanges: boolean;
  onBack: () => void;
  onClearAll: () => void;
  onSelectAll: () => void;
  onToggleUnit: (unitId: string) => void;
  options: ExtraCompatibilityUnitOption[];
}
