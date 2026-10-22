import type { useReservationFormViewModelDependencies } from "../hooks/useReservationFormViewModelDependencies";
import type { useCustomComboForm } from "../hooks/useCustomComboForm";
import type { usePredefinedComboForm } from "../hooks/usePredefinedComboForm";
import type { ReservationFormViewModel } from "./ReservationFormViewModel.interface";

export interface ReservationFormViewModelSetup {
  dependencies: ReturnType<
    typeof useReservationFormViewModelDependencies
  >;
  customCombo: ReturnType<typeof useCustomComboForm>;
  predefinedCombo: ReturnType<
    typeof usePredefinedComboForm
  >;
  handleSubmit: ReservationFormViewModel["handleSubmit"];
  handleReservationTypeChange: ReservationFormViewModel["handleReservationTypeChange"];
}
