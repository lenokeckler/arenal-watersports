import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormFeedbackProps } from "../models/ReservationFormFeedbackProps.interface";
import {
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_STATUS_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationFormFeedback = ({
  categories,
  copy = RESERVATION_FORM_UI_COPY,
  viewModel,
}: ReservationFormFeedbackProps): React.JSX.Element => (
  <>
    {categories.length === 0 && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_ERROR_CLASS}
      >
        {RESERVATION_FORM_UI_COPY.NO_CATEGORIES}
      </Text>
    )}
    {viewModel.formError && (
      <Text
        role={ARIA_ROLE.ALERT}
        className={RESERVATION_FORM_ERROR_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    {viewModel.isSubmitted && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_STATUS_CLASS}
      >
        {copy.SUCCESS}
      </Text>
    )}
  </>
);

export default ReservationFormFeedback;
