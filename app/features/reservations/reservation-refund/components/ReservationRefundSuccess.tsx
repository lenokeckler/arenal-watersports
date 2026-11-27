import { Link, Text } from "@/app/components";
import {
  ARIA_ROLE,
  CURRENCY_NAME_COPY,
  PATHS,
} from "@/app/constants";
import { formatMoney } from "@/app/utils/money/formatMoney";
import { RESERVATION_REFUND_FORM_COPY as COPY } from "../constants/ReservationRefundFormCopy.constants";
import {
  RESERVATION_REFUND_FIELD_ID,
  RESERVATION_REFUND_FOCUS,
} from "../constants/ReservationRefundUi.constants";
import { RESERVATION_REFUND_UI_COPY } from "../constants/ReservationRefundUiCopy.constants";
import { useReservationRefundSuccessFocus } from "../hooks/useReservationRefundSuccessFocus";
import type { ReservationRefundSuccessProps } from "../models/ReservationRefundSuccessProps.interface";
import {
  RESERVATION_REFUND_DETAIL_LINK_CLASS,
  RESERVATION_REFUND_DETAILS_CLASS,
  RESERVATION_REFUND_STACK_CLASS,
} from "../styles/ReservationRefund.styles";
import ReservationRefundSummaryRow from "./ReservationRefundSummaryRow";

const ReservationRefundSuccess = ({
  code,
  recorded,
  reservationId,
}: ReservationRefundSuccessProps): React.JSX.Element => {
  useReservationRefundSuccessFocus();

  return (
    <div className={RESERVATION_REFUND_STACK_CLASS}>
      <Text
        id={RESERVATION_REFUND_FIELD_ID.SUCCESS}
        role={ARIA_ROLE.STATUS}
        tabIndex={RESERVATION_REFUND_FOCUS.TAB_INDEX}
      >
        {COPY.SUCCESS(code)}
      </Text>
      <dl className={RESERVATION_REFUND_DETAILS_CLASS}>
        <ReservationRefundSummaryRow
          label={COPY.LABEL_AMOUNT}
          value={formatMoney({
            amount: recorded.amount,
            currency: recorded.currency,
          })}
        />
        <ReservationRefundSummaryRow
          label={COPY.LABEL_CURRENCY}
          value={CURRENCY_NAME_COPY[recorded.currency]}
        />
        <ReservationRefundSummaryRow
          label={COPY.LABEL_REASON}
          value={recorded.reason}
        />
      </dl>
      <Text>
        {COPY.RECORDED_BY(recorded.recordedByName)}
      </Text>
      <Link
        href={PATHS.RESERVATIONS.DETAIL(reservationId)}
        className={RESERVATION_REFUND_DETAIL_LINK_CLASS}
      >
        {RESERVATION_REFUND_UI_COPY.BACK_TO_RESERVATION}
      </Link>
    </div>
  );
};

export default ReservationRefundSuccess;
