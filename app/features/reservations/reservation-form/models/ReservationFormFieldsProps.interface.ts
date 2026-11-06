import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationGuideAssignmentViewModel } from "./ReservationGuideAssignmentViewModel.interface";

export interface ReservationFormFieldsProps {
  categories: ReservationCategoryOption[];
  viewModel: ReservationGuideAssignmentViewModel;
}
