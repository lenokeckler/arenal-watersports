import type { PredefinedComboSelectionMode } from "./PredefinedComboSelectionMode.type";

export interface PredefinedComboModeOptionProps {
  groupName: string;
  id: string;
  label: string;
  mode: PredefinedComboSelectionMode;
  onModeChange: (
    mode: PredefinedComboSelectionMode
  ) => void;
  selectedMode: PredefinedComboSelectionMode;
}
