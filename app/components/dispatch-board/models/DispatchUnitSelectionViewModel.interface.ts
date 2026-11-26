import type { DispatchTakeViewModel } from "./DispatchTakeViewModel.interface";

export interface DispatchUnitSelectionViewModel {
  handleResetUnits: () => void;
  handleToggleUnit: (unitId: string) => void;
  isSelectionComplete: boolean;
  selectedUnitIds: string[];
  take: DispatchTakeViewModel;
  targetCount: number;
}
