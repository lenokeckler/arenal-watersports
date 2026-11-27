import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_DEPOSIT_UNAVAILABLE_COPY as COPY } from "../constants/ReservationDepositUnavailableCopy.constants";
import type { ReservationDepositUnavailableProps } from "../models/ReservationDepositUnavailableProps.interface";
import {
  RESERVATION_DEPOSIT_LOCKED_CLASS,
  RESERVATION_DEPOSIT_LOCKED_TITLE_CLASS,
  RESERVATION_DEPOSIT_STACK_CLASS,
} from "../styles/ReservationDeposit.styles";
import ReservationDepositLayout from "./ReservationDepositLayout";

const ReservationDepositUnavailable = ({
  reason,
  reservationId,
}: ReservationDepositUnavailableProps): React.JSX.Element => (
  <ReservationDepositLayout reservationId={reservationId}>
    <div className={RESERVATION_DEPOSIT_STACK_CLASS}>
      <div
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_DEPOSIT_LOCKED_CLASS}
      >
        <Text
          className={RESERVATION_DEPOSIT_LOCKED_TITLE_CLASS}
        >
          {COPY.TITLE[reason]}
        </Text>
        <Text>{COPY.BODY[reason]}</Text>
      </div>
    </div>
  </ReservationDepositLayout>
);

export default ReservationDepositUnavailable;
