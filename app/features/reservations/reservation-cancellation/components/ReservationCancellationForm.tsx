import {
  Button,
  FormField,
  Link,
  Text,
} from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { FORM_FIELD_VARIANT } from "@/app/components/form-field/constants/FormFieldVariant.constants";
import {
  ARIA_ROLE,
  INPUT_TYPES,
  PATHS,
} from "@/app/constants";
import {
  RESERVATION_CANCELLATION_FIELD_ID,
  RESERVATION_CANCELLATION_FOCUS,
} from "../constants/ReservationCancellationUi.constants";
import { RESERVATION_CANCELLATION_FORM_COPY as COPY } from "../constants/ReservationCancellationFormCopy.constants";
import type { ReservationCancellationFormProps } from "../models/ReservationCancellationFormProps.interface";
import {
  RESERVATION_CANCELLATION_ACTIONS_CLASS,
  RESERVATION_CANCELLATION_ALERT_CLASS,
  RESERVATION_CANCELLATION_HINT_CLASS,
  RESERVATION_CANCELLATION_SECONDARY_LINK_CLASS,
  RESERVATION_CANCELLATION_SUBMIT_CLASS,
} from "../styles/ReservationCancellationForm.styles";
import ReservationCancellationCauseField from "./ReservationCancellationCauseField";
import ReservationCancellationNote from "./ReservationCancellationNote";

const HELPER_ID = `${RESERVATION_CANCELLATION_FIELD_ID.REASON}-helper`;

const ReservationCancellationForm = ({
  viewModel,
}: ReservationCancellationFormProps): React.JSX.Element => (
  <>
    <ReservationCancellationNote
      requiresCause={viewModel.requiresCause}
    />
    {viewModel.requiresCause && (
      <ReservationCancellationCauseField
        viewModel={viewModel}
      />
    )}
    <div>
      <FormField
        id={RESERVATION_CANCELLATION_FIELD_ID.REASON}
        name={RESERVATION_CANCELLATION_FIELD_ID.REASON}
        label={COPY.LABEL_REASON}
        type={INPUT_TYPES.TEXTAREA}
        placeholder={
          viewModel.requiresCause
            ? COPY.REASON_PLACEHOLDER_DISPATCHED
            : COPY.REASON_PLACEHOLDER
        }
        value={viewModel.reason}
        disabled={viewModel.isPending}
        describedBy={HELPER_ID}
        onChange={(event) =>
          viewModel.setReason(event.target.value)
        }
        error={viewModel.errors.reason}
        showErrorText
        variant={FORM_FIELD_VARIANT.GLASS}
      />
      <Text
        id={HELPER_ID}
        className={RESERVATION_CANCELLATION_HINT_CLASS}
      >
        {viewModel.requiresCause
          ? COPY.REASON_HELPER_DISPATCHED
          : COPY.REASON_HELPER}
      </Text>
    </div>
    {viewModel.formError && (
      <Text
        id={RESERVATION_CANCELLATION_FIELD_ID.ALERT}
        role={ARIA_ROLE.ALERT}
        tabIndex={RESERVATION_CANCELLATION_FOCUS.TAB_INDEX}
        className={RESERVATION_CANCELLATION_ALERT_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={COPY.ACTIONS}
      className={RESERVATION_CANCELLATION_ACTIONS_CLASS}
    >
      <Button
        type="submit"
        variant={BUTTON.DANGER}
        className={RESERVATION_CANCELLATION_SUBMIT_CLASS}
        disabled={viewModel.isSubmitDisabled}
      >
        {viewModel.isPending
          ? COPY.SUBMITTING
          : COPY.SUBMIT}
      </Button>
      <Link
        href={PATHS.RESERVATIONS.CALENDAR}
        className={
          RESERVATION_CANCELLATION_SECONDARY_LINK_CLASS
        }
      >
        {COPY.BACK}
      </Link>
    </div>
  </>
);

export default ReservationCancellationForm;
