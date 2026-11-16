import { Button, Link, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import { RESERVATION_REFUND_REASON } from "../constants/ReservationRefundReason.constants";
import {
  RESERVATION_REFUND_FIELD_ID,
  RESERVATION_REFUND_FOCUS,
} from "../constants/ReservationRefundUi.constants";
import type { ReservationRefundFormProps } from "../models/ReservationRefundFormProps.interface";
import {
  RESERVATION_REFUND_ACTIONS_CLASS,
  RESERVATION_REFUND_ALERT_CLASS,
  RESERVATION_REFUND_SECONDARY_LINK_CLASS,
  RESERVATION_REFUND_SUBMIT_CLASS,
} from "../styles/ReservationRefundForm.styles";
import ReservationRefundAmountField from "./ReservationRefundAmountField";
import ReservationRefundCurrencyField from "./ReservationRefundCurrencyField";
import ReservationRefundOtherReasonField from "./ReservationRefundOtherReasonField";
import ReservationRefundReasonField from "./ReservationRefundReasonField";

const ReservationRefundForm = ({
  refund,
  viewModel,
}: ReservationRefundFormProps): React.JSX.Element => (
  <>
    {viewModel.currencyOptions.length > 1 && (
      <ReservationRefundCurrencyField
        refund={refund}
        viewModel={viewModel}
      />
    )}
    <ReservationRefundAmountField viewModel={viewModel} />
    <ReservationRefundReasonField viewModel={viewModel} />
    {viewModel.reason ===
      RESERVATION_REFUND_REASON.OTHER && (
      <ReservationRefundOtherReasonField
        viewModel={viewModel}
      />
    )}
    {viewModel.formError && (
      <Text
        id={RESERVATION_REFUND_FIELD_ID.ALERT}
        role={ARIA_ROLE.ALERT}
        tabIndex={RESERVATION_REFUND_FOCUS.TAB_INDEX}
        className={RESERVATION_REFUND_ALERT_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={COPY.ACTIONS}
      className={RESERVATION_REFUND_ACTIONS_CLASS}
    >
      <Button
        type="submit"
        variant={BUTTON.PRIMARY}
        className={RESERVATION_REFUND_SUBMIT_CLASS}
        disabled={viewModel.isSubmitDisabled}
      >
        {viewModel.isPending
          ? COPY.SUBMITTING
          : COPY.SUBMIT}
      </Button>
      <Link
        href={PATHS.RESERVATIONS.DETAIL(refund.id)}
        className={RESERVATION_REFUND_SECONDARY_LINK_CLASS}
      >
        {COPY.BACK}
      </Link>
    </div>
  </>
);

export default ReservationRefundForm;
