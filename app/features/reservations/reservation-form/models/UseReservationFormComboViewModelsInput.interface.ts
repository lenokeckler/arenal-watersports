import type { ReservationPredefinedCombo } from "./ReservationPredefinedCombo.interface";
import type { useReservationFormViewModelDependencies } from "../hooks/useReservationFormViewModelDependencies";

export interface UseReservationFormComboViewModelsInput {
  dependencies: ReturnType<
    typeof useReservationFormViewModelDependencies
  >;
  predefinedCombos: ReservationPredefinedCombo[];
}
