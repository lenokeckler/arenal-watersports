import Button from "@/app/components/button/Button";
import { BUTTON } from "@/app/constants";
import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationFormSubmitActionProps } from "../models/ReservationFormSubmitActionProps.interface";
import {
  RESERVATION_FORM_ACTIONS_CLASS,
  RESERVATION_FORM_SUBMIT_CLASS,
} from "../styles/ReservationFormView.styles";

const ReservationFormSubmitAction = ({
  copy = RESERVATION_FORM_UI_COPY,
  isDisabled,
  viewModel,
}: ReservationFormSubmitActionProps): React.JSX.Element => (
  <div
    role="group"
    aria-label={RESERVATION_FORM_UI_COPY.ACTIONS}
    className={RESERVATION_FORM_ACTIONS_CLASS}
  >
    <Button
      type="submit"
      variant={BUTTON.PRIMARY}
      className={RESERVATION_FORM_SUBMIT_CLASS}
      disabled={isDisabled}
    >
      {viewModel.isPending ? copy.SUBMITTING : copy.SUBMIT}
    </Button>
  </div>
);

export default ReservationFormSubmitAction;
