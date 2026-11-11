import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationFormViewModel } from "./ReservationFormViewModel.interface";
import type { ReservationGuideAssignmentViewModel } from "./ReservationGuideAssignmentViewModel.interface";

export interface ReservationFormFieldsProps {
  categories: ReservationCategoryOption[];
  viewModel: ReservationFormViewModel;
  guideAssignmentViewModel?: ReservationGuideAssignmentViewModel;
}
