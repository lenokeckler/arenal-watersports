import type { CustomComboFormViewModel } from "./CustomComboFormViewModel.interface";
import type { ReservationFormErrorField } from "./ReservationFormField.constants";

export interface CustomComboAgreedAmountsProps {
  errors: Partial<
    Record<ReservationFormErrorField, string>
  >;
  viewModel: CustomComboFormViewModel;
}
