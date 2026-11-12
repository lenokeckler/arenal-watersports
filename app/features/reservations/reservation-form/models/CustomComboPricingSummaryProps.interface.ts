import type { CustomComboFormViewModel } from "./CustomComboFormViewModel.interface";
import type { ReservationFormErrorField } from "./ReservationFormField.constants";

export interface CustomComboPricingSummaryProps {
  errors: Partial<
    Record<ReservationFormErrorField, string>
  >;
  viewModel: CustomComboFormViewModel;
}
