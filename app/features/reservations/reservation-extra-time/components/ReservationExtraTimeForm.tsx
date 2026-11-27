import { Button, Link, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_FORM_COPY as COPY } from "../constants/ReservationExtraTimeFormCopy.constants";
import {
  RESERVATION_EXTRA_TIME_FIELD_ID as FIELD_ID,
  RESERVATION_EXTRA_TIME_FOCUS,
} from "../constants/ReservationExtraTimeUi.constants";
import type { ReservationExtraTimeFormProps } from "../models/ReservationExtraTimeFormProps.interface";
import {
  RESERVATION_EXTRA_TIME_ACTIONS_CLASS,
  RESERVATION_EXTRA_TIME_ALERT_CLASS,
  RESERVATION_EXTRA_TIME_CHARGE_BLOCK_CLASS,
  RESERVATION_EXTRA_TIME_SECONDARY_LINK_CLASS,
  RESERVATION_EXTRA_TIME_SUBMIT_CLASS,
} from "../styles/ReservationExtraTimeForm.styles";
import ReservationExtraTimeAmountField from "./ReservationExtraTimeAmountField";
import ReservationExtraTimeCurrencyField from "./ReservationExtraTimeCurrencyField";
import ReservationExtraTimeOutcomeField from "./ReservationExtraTimeOutcomeField";
import ReservationExtraTimePaymentMethodField from "./ReservationExtraTimePaymentMethodField";

const resolveSubmitLabel = ({
  viewModel,
}: Pick<
  ReservationExtraTimeFormProps,
  "viewModel"
>): string => {
  if (viewModel.isPending) {
    return COPY.SUBMITTING;
  }
  return viewModel.outcome === null
    ? COPY.SUBMIT_UNDECIDED
    : COPY.SUBMIT[viewModel.outcome];
};

const ReservationExtraTimeForm = ({
  reservationId,
  viewModel,
}: ReservationExtraTimeFormProps): React.JSX.Element => (
  <>
    <ReservationExtraTimeOutcomeField
      viewModel={viewModel}
    />
    {viewModel.isCharged ? (
      <div
        className={
          RESERVATION_EXTRA_TIME_CHARGE_BLOCK_CLASS
        }
      >
        <ReservationExtraTimeCurrencyField
          viewModel={viewModel}
        />
        <ReservationExtraTimeAmountField
          viewModel={viewModel}
        />
        <ReservationExtraTimePaymentMethodField
          viewModel={viewModel}
        />
      </div>
    ) : null}
    {viewModel.formError ? (
      <Text
        id={FIELD_ID.ALERT}
        role={ARIA_ROLE.ALERT}
        tabIndex={RESERVATION_EXTRA_TIME_FOCUS.TAB_INDEX}
        className={RESERVATION_EXTRA_TIME_ALERT_CLASS}
      >
        {viewModel.formError}
      </Text>
    ) : null}
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={COPY.ACTIONS}
      className={RESERVATION_EXTRA_TIME_ACTIONS_CLASS}
    >
      <Button
        type="submit"
        variant={BUTTON.PRIMARY}
        className={RESERVATION_EXTRA_TIME_SUBMIT_CLASS}
        disabled={viewModel.isSubmitDisabled}
      >
        {resolveSubmitLabel({ viewModel })}
      </Button>
      <Link
        href={PATHS.RESERVATIONS.DETAIL(reservationId)}
        className={
          RESERVATION_EXTRA_TIME_SECONDARY_LINK_CLASS
        }
      >
        {COPY.BACK}
      </Link>
    </div>
  </>
);

export default ReservationExtraTimeForm;
