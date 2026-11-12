import { RESERVATION_FORM_UI_COPY } from "../constants/ReservationFormUiCopy.constants";
import type { ReservationEditSummaryProps } from "../models/ReservationEditSummaryProps.interface";
import {
  RESERVATION_EDIT_SUMMARY_CLASS,
  RESERVATION_EDIT_SUMMARY_LABEL_CLASS,
  RESERVATION_EDIT_SUMMARY_VALUE_CLASS,
} from "../styles/ReservationEdit.styles";
import { formatReservationEditDate } from "../utils/formatReservationEditDate";

const ReservationEditSummary = ({
  reservation,
}: ReservationEditSummaryProps): React.JSX.Element => (
  <dl className={RESERVATION_EDIT_SUMMARY_CLASS}>
    <div>
      <dt className={RESERVATION_EDIT_SUMMARY_LABEL_CLASS}>
        {RESERVATION_FORM_UI_COPY.CUSTOMER_NAME}
      </dt>
      <dd className={RESERVATION_EDIT_SUMMARY_VALUE_CLASS}>
        {reservation.customerName}
      </dd>
    </div>
    <div>
      <dt className={RESERVATION_EDIT_SUMMARY_LABEL_CLASS}>
        {RESERVATION_FORM_UI_COPY.DATE}
      </dt>
      <dd className={RESERVATION_EDIT_SUMMARY_VALUE_CLASS}>
        {formatReservationEditDate(reservation.date)}
      </dd>
    </div>
  </dl>
);

export default ReservationEditSummary;
