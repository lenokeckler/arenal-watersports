import type { ReservationHistoryDetailFieldProps } from "../models/ReservationHistoryDetailFieldProps.interface";
import {
  RESERVATION_HISTORY_DETAIL_FIELD_CLASS,
  RESERVATION_HISTORY_DETAIL_LABEL_CLASS,
  RESERVATION_HISTORY_DETAIL_VALUE_CLASS,
} from "../styles/ReservationHistoryDetail.styles";

const ReservationHistoryDetailField = ({
  children,
  label,
}: ReservationHistoryDetailFieldProps): React.JSX.Element => (
  <div className={RESERVATION_HISTORY_DETAIL_FIELD_CLASS}>
    <dt className={RESERVATION_HISTORY_DETAIL_LABEL_CLASS}>
      {label}
    </dt>
    <dd className={RESERVATION_HISTORY_DETAIL_VALUE_CLASS}>
      {children}
    </dd>
  </div>
);

export default ReservationHistoryDetailField;
