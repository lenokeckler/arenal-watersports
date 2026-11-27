import { Button, Link, Text } from "@/app/components";
import { BUTTON } from "@/app/components/button/constants";
import {
  ARIA_ROLE,
  BUTTON_TYPES,
  PATHS,
} from "@/app/constants";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import {
  RESERVATION_DEPOSIT_FIELD_ID,
  RESERVATION_DEPOSIT_FOCUS,
} from "../constants/ReservationDepositUi.constants";
import type { ReservationDepositFormProps } from "../models/ReservationDepositFormProps.interface";
import { RESERVATION_DEPOSIT_NOTE_CLASS } from "../styles/ReservationDeposit.styles";
import {
  RESERVATION_DEPOSIT_ACTIONS_CLASS,
  RESERVATION_DEPOSIT_ALERT_CLASS,
  RESERVATION_DEPOSIT_SECONDARY_LINK_CLASS,
  RESERVATION_DEPOSIT_SUBMIT_CLASS,
} from "../styles/ReservationDepositForm.styles";
import { resolveReservationDepositSubmitLabel } from "../utils/resolveReservationDepositSubmitLabel";
import ReservationDepositAmountField from "./ReservationDepositAmountField";
import ReservationDepositCurrencyField from "./ReservationDepositCurrencyField";
import ReservationDepositDecisionField from "./ReservationDepositDecisionField";

const ReservationDepositForm = ({
  reservationId,
  viewModel,
}: ReservationDepositFormProps): React.JSX.Element => (
  <>
    <ReservationDepositDecisionField
      hasDeposit={viewModel.hasDeposit}
      isPending={viewModel.isPending}
      onSelect={viewModel.setHasDeposit}
    />
    {viewModel.hasDeposit ? (
      <>
        <ReservationDepositCurrencyField
          currency={viewModel.currency}
          isPending={viewModel.isPending}
          onSelect={viewModel.setCurrency}
          proposal={viewModel.proposal}
        />
        <ReservationDepositAmountField
          amountText={viewModel.amountText}
          currency={viewModel.currency}
          error={viewModel.errors.amount}
          isPending={viewModel.isPending}
          onChange={viewModel.setAmountText}
          proposal={viewModel.proposal}
        />
      </>
    ) : (
      <Text className={RESERVATION_DEPOSIT_NOTE_CLASS}>
        {COPY.DECISION_DECLINED_NOTE}
      </Text>
    )}
    {viewModel.formError && (
      <Text
        id={RESERVATION_DEPOSIT_FIELD_ID.ALERT}
        role={ARIA_ROLE.ALERT}
        tabIndex={RESERVATION_DEPOSIT_FOCUS.TAB_INDEX}
        className={RESERVATION_DEPOSIT_ALERT_CLASS}
      >
        {viewModel.formError}
      </Text>
    )}
    <div
      role={ARIA_ROLE.GROUP}
      aria-label={COPY.ACTIONS}
      className={RESERVATION_DEPOSIT_ACTIONS_CLASS}
    >
      <Button
        type={BUTTON_TYPES.SUBMIT}
        variant={BUTTON.PRIMARY}
        className={RESERVATION_DEPOSIT_SUBMIT_CLASS}
        disabled={viewModel.isSubmitDisabled}
      >
        {resolveReservationDepositSubmitLabel(
          viewModel.hasDeposit,
          viewModel.isPending
        )}
      </Button>
      <Link
        href={PATHS.RESERVATIONS.DETAIL(reservationId)}
        className={RESERVATION_DEPOSIT_SECONDARY_LINK_CLASS}
      >
        {COPY.BACK}
      </Link>
    </div>
  </>
);

export default ReservationDepositForm;
