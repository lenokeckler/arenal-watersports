import type { NullableRef } from "@/app/types";
import type { PredefinedComboSelectionMode } from "./PredefinedComboSelectionMode.type";
import type { ReservationPredefinedCombo } from "./ReservationPredefinedCombo.interface";
import type { PredefinedComboFormViewModel } from "./PredefinedComboFormViewModel.interface";

export interface CreatePredefinedComboFormViewModelInput {
  combos: ReservationPredefinedCombo[];
  isComboReservation: boolean;
  mode: PredefinedComboSelectionMode;
  selectedCombo: NullableRef<ReservationPredefinedCombo>;
  selectedComboId: NullableRef<string>;
  handlers: Pick<
    PredefinedComboFormViewModel,
    "handleComboSelection" | "handleModeChange" | "reset"
  >;
}
