import type { ReservationCategoryOption } from "./ReservationCategoryOption.interface";
import type { ReservationGuideAssignmentViewModel } from "./ReservationGuideAssignmentViewModel.interface";

export interface ReservationFormCardProps {
  categories: ReservationCategoryOption[];
  viewModel: ReservationGuideAssignmentViewModel;
}
