import Text from "@/app/components/text/Text";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormCardProps } from "../models/ReservationFormCardProps.interface";
import {
  RESERVATION_FORM_ERROR_CLASS,
  RESERVATION_FORM_STATUS_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationSubmissionFeedback = ({
  viewModel,
}: ReservationFormCardProps): React.JSX.Element => (
  <>
    {viewModel.formError && (
      <Text
        role={ARIA_ROLE.ALERT}
        className={RESERVATION_FORM_ERROR_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    {viewModel.hasEquipmentSelectionChanged && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_STATUS_CLASS}
      >
        {
          RESERVATION_FORM_UI_COPY.EQUIPMENT_SELECTION_CHANGED
        }
      </Text>
    )}
    {viewModel.isSubmitted && (
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_FORM_STATUS_CLASS}
      >
        {RESERVATION_FORM_UI_COPY.SUCCESS}
      </Text>
    )}
  </>
);

export default ReservationSubmissionFeedback;
