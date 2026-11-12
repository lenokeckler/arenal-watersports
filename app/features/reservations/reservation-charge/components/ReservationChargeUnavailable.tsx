import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_CHARGE_UNAVAILABLE_COPY as COPY } from "../constants/ReservationChargeUnavailableCopy.constants";
import type { ReservationChargeUnavailableProps } from "../models/ReservationChargeUnavailableProps.interface";
import {
  RESERVATION_CHARGE_LOCKED_CLASS,
  RESERVATION_CHARGE_LOCKED_TITLE_CLASS,
  RESERVATION_CHARGE_STACK_CLASS,
} from "../styles/ReservationCharge.styles";
import ReservationChargeLayout from "./ReservationChargeLayout";

const ReservationChargeUnavailable = ({
  reason,
  reservationId,
}: ReservationChargeUnavailableProps): React.JSX.Element => (
  <ReservationChargeLayout reservationId={reservationId}>
    <div className={RESERVATION_CHARGE_STACK_CLASS}>
      <div
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_CHARGE_LOCKED_CLASS}
      >
        <Text
          className={RESERVATION_CHARGE_LOCKED_TITLE_CLASS}
        >
          {COPY.TITLE}
        </Text>
        <Text>{COPY.BODY[reason]}</Text>
        <Text>{COPY.RULE}</Text>
      </div>
    </div>
  </ReservationChargeLayout>
);

export default ReservationChargeUnavailable;
