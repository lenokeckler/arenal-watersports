import type { DispatchSheetGroup } from "./DispatchSheetGroup.interface";
import type { DispatchUnitReadingsViewModel } from "./DispatchUnitReadingsViewModel.interface";

export interface DispatchUnitReadingsProps {
  group: DispatchSheetGroup;
  readings: DispatchUnitReadingsViewModel;
}
