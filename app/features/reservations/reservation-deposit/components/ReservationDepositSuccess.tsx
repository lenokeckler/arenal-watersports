import { Link, Text } from "@/app/components";
import {
  ARIA_ROLE,
  CURRENCY_NAME_COPY,
  PATHS,
  RESERVATION_DEPOSIT_DECISION_KIND,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_DEPOSIT_FORM_COPY as COPY } from "../constants/ReservationDepositFormCopy.constants";
import {
  RESERVATION_DEPOSIT_FIELD_ID,
  RESERVATION_DEPOSIT_FOCUS,
} from "../constants/ReservationDepositUi.constants";
import { RESERVATION_DEPOSIT_UI_COPY } from "../constants/ReservationDepositUiCopy.constants";
import { useReservationDepositSuccessFocus } from "../hooks/useReservationDepositSuccessFocus";
import type { ReservationDepositSuccessProps } from "../models/ReservationDepositSuccessProps.interface";
import {
  RESERVATION_DEPOSIT_DETAIL_LINK_CLASS,
  RESERVATION_DEPOSIT_DETAILS_CLASS,
  RESERVATION_DEPOSIT_STACK_CLASS,
} from "../styles/ReservationDeposit.styles";
import { RESERVATION_DEPOSIT_SECONDARY_LINK_CLASS } from "../styles/ReservationDepositForm.styles";
import ReservationDepositSummaryRow from "./ReservationDepositSummaryRow";

const ReservationDepositSuccess = ({
  code,
  recorded,
  reservationId,
}: ReservationDepositSuccessProps): React.JSX.Element => {
  useReservationDepositSuccessFocus();
  const { decision } = recorded;
  const isReceived =
    decision.kind ===
    RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED;

  return (
    <div className={RESERVATION_DEPOSIT_STACK_CLASS}>
      <Text
        id={RESERVATION_DEPOSIT_FIELD_ID.SUCCESS}
        role={ARIA_ROLE.STATUS}
        tabIndex={RESERVATION_DEPOSIT_FOCUS.TAB_INDEX}
      >
        {isReceived
          ? COPY.SUCCESS_RECEIVED(code)
          : COPY.SUCCESS_DECLINED(code)}
      </Text>
      {decision.kind ===
        RESERVATION_DEPOSIT_DECISION_KIND.RECEIVED && (
        <dl className={RESERVATION_DEPOSIT_DETAILS_CLASS}>
          <ReservationDepositSummaryRow
            label={COPY.LABEL_AMOUNT}
            value={formatMoney({
              amount: decision.amount,
              currency: decision.currency,
            })}
          />
          <ReservationDepositSummaryRow
            label={COPY.LABEL_CURRENCY}
            value={CURRENCY_NAME_COPY[decision.currency]}
          />
        </dl>
      )}
      {recorded.recordedByName !== null && (
        <Text>
          {COPY.RECORDED_BY(recorded.recordedByName)}
        </Text>
      )}
      <Link
        href={PATHS.RESERVATIONS.DETAIL(reservationId)}
        className={RESERVATION_DEPOSIT_DETAIL_LINK_CLASS}
      >
        {RESERVATION_DEPOSIT_UI_COPY.BACK_TO_RESERVATION}
      </Link>
      {isReceived && (
        <Link
          href={PATHS.RESERVATIONS.DEPOSITS}
          className={
            RESERVATION_DEPOSIT_SECONDARY_LINK_CLASS
          }
        >
          {COPY.PENDING_DEPOSITS}
        </Link>
      )}
    </div>
  );
};

export default ReservationDepositSuccess;
