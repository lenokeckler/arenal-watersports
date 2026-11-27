import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_REFUND_UNAVAILABLE_COPY as COPY } from "../constants/ReservationRefundUnavailableCopy.constants";
import type { ReservationRefundUnavailableProps } from "../models/ReservationRefundUnavailableProps.interface";
import {
  RESERVATION_REFUND_LOCKED_CLASS,
  RESERVATION_REFUND_LOCKED_TITLE_CLASS,
  RESERVATION_REFUND_STACK_CLASS,
} from "../styles/ReservationRefund.styles";
import ReservationRefundLayout from "./ReservationRefundLayout";

const ReservationRefundUnavailable = ({
  reservationId,
}: ReservationRefundUnavailableProps): React.JSX.Element => (
  <ReservationRefundLayout reservationId={reservationId}>
    <div className={RESERVATION_REFUND_STACK_CLASS}>
      <div
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_REFUND_LOCKED_CLASS}
      >
        <Text
          className={RESERVATION_REFUND_LOCKED_TITLE_CLASS}
        >
          {COPY.TITLE}
        </Text>
        <Text>{COPY.BODY}</Text>
        <Text>{COPY.RULE}</Text>
      </div>
    </div>
  </ReservationRefundLayout>
);

export default ReservationRefundUnavailable;
