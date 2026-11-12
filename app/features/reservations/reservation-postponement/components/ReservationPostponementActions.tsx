import { Button, Link, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_FORM_COPY as COPY } from "../constants/ReservationPostponementFormCopy.constants";
import {
  RESERVATION_POSTPONEMENT_FIELD_ID,
  RESERVATION_POSTPONEMENT_FOCUS,
} from "../constants/ReservationPostponementUi.constants";
import type { ReservationPostponementFormPartProps } from "../models/ReservationPostponementFormPartProps.interface";
import {
  RESERVATION_POSTPONEMENT_ACTIONS_CLASS,
  RESERVATION_POSTPONEMENT_ALERT_CLASS,
  RESERVATION_POSTPONEMENT_CANCEL_CLASS,
  RESERVATION_POSTPONEMENT_SUBMIT_CLASS,
} from "../styles/ReservationPostponementForm.styles";

const ReservationPostponementActions = ({
  viewModel,
}: ReservationPostponementFormPartProps): React.JSX.Element => (
  <>
    {viewModel.formError && (
      <Text
        id={RESERVATION_POSTPONEMENT_FIELD_ID.ALERT}
        role={ARIA_ROLE.ALERT}
        tabIndex={RESERVATION_POSTPONEMENT_FOCUS.TAB_INDEX}
        className={RESERVATION_POSTPONEMENT_ALERT_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={COPY.ACTIONS}
      className={RESERVATION_POSTPONEMENT_ACTIONS_CLASS}
    >
      <Button
        type="submit"
        variant={BUTTON.PRIMARY}
        className={RESERVATION_POSTPONEMENT_SUBMIT_CLASS}
        disabled={viewModel.isSubmitDisabled}
      >
        {viewModel.isPending
          ? COPY.SUBMITTING
          : COPY.SUBMIT}
      </Button>
      <Link
        href={PATHS.RESERVATIONS.CALENDAR}
        className={RESERVATION_POSTPONEMENT_CANCEL_CLASS}
      >
        {COPY.CANCEL}
      </Link>
    </div>
  </>
);

export default ReservationPostponementActions;
