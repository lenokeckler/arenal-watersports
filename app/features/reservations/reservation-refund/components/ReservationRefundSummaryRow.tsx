import type { ReservationRefundSummaryRowProps } from "../models/ReservationRefundSummaryRowProps.interface";
import {
  RESERVATION_REFUND_DEFINITION_CLASS,
  RESERVATION_REFUND_TERM_CLASS,
} from "../styles/ReservationRefund.styles";

const ReservationRefundSummaryRow = ({
  label,
  value,
}: ReservationRefundSummaryRowProps): React.JSX.Element => (
  <div>
    <dt className={RESERVATION_REFUND_TERM_CLASS}>
      {label}
    </dt>
    <dd className={RESERVATION_REFUND_DEFINITION_CLASS}>
      {value}
    </dd>
  </div>
);

export default ReservationRefundSummaryRow;
