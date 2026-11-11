import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import { RESERVATION_FORM_CARD_CLASS } from "../styles/ReservationFormView.styles";
import ReservationFormFeedback from "./ReservationFormFeedback";
import ReservationFormFields from "./ReservationFormFields";
import ReservationFormSubmitAction from "./ReservationFormSubmitAction";

const ReservationFormCard = ({
  categories,
  viewModel,
}: ReservationFormCardProps): React.JSX.Element => (
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
        isDisabled={viewModel.isSubmitDisabled}
        viewModel={viewModel}
      />
    </form>
  </div>
);

export default ReservationFormCard;
