import type { DispatchTimesViewModel } from "./DispatchTimesViewModel.interface";

export interface DispatchTimeAdjusterProps {
  fieldId: string;
  label: string;
  laterLabel: string;
  onChange: DispatchTimesViewModel["handleDepartureChange"];
  onShift: (direction: number) => void;
  soonerLabel: string;
  value: string;
}
