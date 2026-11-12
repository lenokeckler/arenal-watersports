import type { ReservationChargeSummaryRowProps } from "../models/ReservationChargeSummaryRowProps.interface";
import {
  RESERVATION_CHARGE_DEFINITION_CLASS,
  RESERVATION_CHARGE_TERM_CLASS,
} from "../styles/ReservationCharge.styles";

const ReservationChargeSummaryRow = ({
  label,
  value,
}: ReservationChargeSummaryRowProps): React.JSX.Element => (
  <div>
    <dt className={RESERVATION_CHARGE_TERM_CLASS}>
      {label}
    </dt>
    <dd className={RESERVATION_CHARGE_DEFINITION_CLASS}>
      {value}
    </dd>
  </div>
);

export default ReservationChargeSummaryRow;
