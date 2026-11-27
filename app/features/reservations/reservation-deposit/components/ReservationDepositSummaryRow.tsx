import type { ReservationDepositSummaryRowProps } from "../models/ReservationDepositSummaryRowProps.interface";
import {
  RESERVATION_DEPOSIT_DEFINITION_CLASS,
  RESERVATION_DEPOSIT_TERM_CLASS,
} from "../styles/ReservationDeposit.styles";

const ReservationDepositSummaryRow = ({
  label,
  value,
}: ReservationDepositSummaryRowProps): React.JSX.Element => (
  <div>
    <dt className={RESERVATION_DEPOSIT_TERM_CLASS}>
      {label}
    </dt>
    <dd className={RESERVATION_DEPOSIT_DEFINITION_CLASS}>
      {value}
    </dd>
  </div>
);

export default ReservationDepositSummaryRow;
