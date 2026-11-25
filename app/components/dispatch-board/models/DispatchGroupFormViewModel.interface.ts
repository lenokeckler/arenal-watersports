import type { FormEvent } from "react";
import type { DispatchRadioChannelViewModel } from "./DispatchRadioChannelViewModel.interface";
import type { DispatchTimesViewModel } from "./DispatchTimesViewModel.interface";
import type { DispatchUnitFuelViewModel } from "./DispatchUnitFuelViewModel.interface";
import type { DispatchUnitSelectionViewModel } from "./DispatchUnitSelectionViewModel.interface";

export interface DispatchGroupFormViewModel {
  canSubmit: boolean;
  fuel: DispatchUnitFuelViewModel;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  radio: DispatchRadioChannelViewModel;
  selection: DispatchUnitSelectionViewModel;
  timeState: DispatchTimesViewModel;
}
