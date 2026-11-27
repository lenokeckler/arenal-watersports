import type { ReservationExtraTimeDetailRowProps } from "../models/ReservationExtraTimeDetailRowProps.interface";
import {
  RESERVATION_EXTRA_TIME_DETAIL_TERM_CLASS,
  RESERVATION_EXTRA_TIME_DETAIL_VALUE_CLASS,
} from "../styles/ReservationExtraTime.styles";

const ReservationExtraTimeDetailRow = ({
  label,
  value,
}: ReservationExtraTimeDetailRowProps): React.JSX.Element => (
  <div>
    <dt
      className={RESERVATION_EXTRA_TIME_DETAIL_TERM_CLASS}
    >
      {label}
    </dt>
    <dd
      className={RESERVATION_EXTRA_TIME_DETAIL_VALUE_CLASS}
    >
      {value}
    </dd>
  </div>
);

export default ReservationExtraTimeDetailRow;
