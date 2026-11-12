import type { PredefinedComboSelectionMode } from "./PredefinedComboSelectionMode.type";

export interface PredefinedComboModeSelectorProps {
  mode: PredefinedComboSelectionMode;
  onModeChange: (
    mode: PredefinedComboSelectionMode
  ) => void;
}
