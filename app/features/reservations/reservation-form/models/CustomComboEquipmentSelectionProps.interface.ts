import type { CustomComboFormViewModel } from "./CustomComboFormViewModel.interface";
import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";

export interface CustomComboEquipmentSelectionProps {
  categories: ReservationCategoryOption[];
  viewModel: CustomComboFormViewModel;
}
