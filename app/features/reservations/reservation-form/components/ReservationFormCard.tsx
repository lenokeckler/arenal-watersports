import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import { RESERVATION_FORM_CARD_CLASS } from "../styles/ReservationFormView.styles";
import ReservationFormFeedback from "./ReservationFormFeedback";
import ReservationFormFields from "./ReservationFormFields";
import ReservationFormSubmitAction from "./ReservationFormSubmitAction";

const ReservationFormCard = ({
  categories,
  viewModel,
}: ReservationFormCardProps): React.JSX.Element => {
  const isAvailabilityUnavailable =
    viewModel.requiresConcreteUnit &&
    (viewModel.availableUnits.length === 0 ||
      viewModel.isAvailabilityLoading ||
      viewModel.hasAvailabilityError);
  const isDisabled =
    viewModel.isPending ||
    categories.length === 0 ||
    isAvailabilityUnavailable;

  return (
    <div className={RESERVATION_FORM_CARD_CLASS}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={viewModel.handleSubmit}
      >
        <ReservationFormFields
          categories={categories}
          viewModel={viewModel}
        />
        <ReservationFormFeedback
          categories={categories}
          viewModel={viewModel}
        />
        <ReservationFormSubmitAction
          isDisabled={isDisabled}
          viewModel={viewModel}
        />
      </form>
    </div>
  );
};

export default ReservationFormCard;
