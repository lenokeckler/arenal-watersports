import type { NullableRef } from "@/app/types";
import type { PredefinedComboSelectionMode } from "./PredefinedComboSelectionMode.type";
import type { ReservationPredefinedCombo } from "./ReservationPredefinedCombo.interface";

export interface PredefinedComboFormViewModel {
  combos: ReservationPredefinedCombo[];
  hasGuideOnlyItem: boolean;
  mode: PredefinedComboSelectionMode;
  selectedCombo: NullableRef<ReservationPredefinedCombo>;
  selectedComboId: NullableRef<string>;
  handleComboSelection: (comboId: string) => void;
  handleModeChange: (
    mode: PredefinedComboSelectionMode
  ) => void;
  reset: () => void;
}
