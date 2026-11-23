import type { DispatchSheetGroup } from "./DispatchSheetGroup.interface";
import type { DispatchUnitFuelViewModel } from "./DispatchUnitFuelViewModel.interface";

export interface DispatchSelectedUnitsProps {
  fuel: DispatchUnitFuelViewModel;
  group: DispatchSheetGroup;
  onChangeUnits: () => void;
  selectedUnitIds: string[];
}
