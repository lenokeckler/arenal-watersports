import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import EquipmentEligibilityFeedback from "./EquipmentEligibilityFeedback";
import ReservationCategoryFeedback from "./ReservationCategoryFeedback";
import ReservationSubmissionFeedback from "./ReservationSubmissionFeedback";

const ReservationFormFeedback = ({
  categories,
  viewModel,
}: ReservationFormCardProps): React.JSX.Element => (
  <>
    <EquipmentEligibilityFeedback
      categories={categories}
      viewModel={viewModel}
    />
    <ReservationCategoryFeedback
      categories={categories}
      viewModel={viewModel}
    />
    <ReservationSubmissionFeedback
      categories={categories}
      viewModel={viewModel}
    />
  </>
);

export default ReservationFormFeedback;
