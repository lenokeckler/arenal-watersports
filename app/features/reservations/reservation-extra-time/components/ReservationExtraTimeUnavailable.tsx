import { Text } from "@/app/components";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_EXTRA_TIME_UNAVAILABLE_COPY as COPY } from "../constants/ReservationExtraTimeUnavailableCopy.constants";
import type { ReservationExtraTimeUnavailableProps } from "../models/ReservationExtraTimeUnavailableProps.interface";
import {
  RESERVATION_EXTRA_TIME_LOCKED_CLASS,
  RESERVATION_EXTRA_TIME_LOCKED_TITLE_CLASS,
} from "../styles/ReservationExtraTime.styles";
import ReservationExtraTimeLayout from "./ReservationExtraTimeLayout";

const ReservationExtraTimeUnavailable = ({
  extraTime,
  reason,
}: ReservationExtraTimeUnavailableProps): React.JSX.Element => (
  <ReservationExtraTimeLayout extraTime={extraTime}>
    <div
      role={ARIA_ROLE.STATUS}
      className={RESERVATION_EXTRA_TIME_LOCKED_CLASS}
    >
      <Text
        className={
          RESERVATION_EXTRA_TIME_LOCKED_TITLE_CLASS
        }
      >
        {COPY.TITLE}
      </Text>
      <Text>{COPY.BODY[reason]}</Text>
    </div>
  </ReservationExtraTimeLayout>
);

export default ReservationExtraTimeUnavailable;
