import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_CANCELLATION_UI_COPY } from "../constants/ReservationCancellationUiCopy.constants";
import { RESERVATION_CANCELLATION_UNAVAILABLE_COPY as COPY } from "../constants/ReservationCancellationUnavailableCopy.constants";
import type { ReservationCancellationUnavailableProps } from "../models/ReservationCancellationUnavailableProps.interface";
import {
  RESERVATION_CANCELLATION_CALENDAR_LINK_CLASS,
  RESERVATION_CANCELLATION_LOCKED_CLASS,
  RESERVATION_CANCELLATION_LOCKED_TITLE_CLASS,
  RESERVATION_CANCELLATION_STACK_CLASS,
} from "../styles/ReservationCancellation.styles";
import ReservationCancellationLayout from "./ReservationCancellationLayout";

const ReservationCancellationUnavailable = ({
  status,
}: ReservationCancellationUnavailableProps): React.JSX.Element => (
  <ReservationCancellationLayout>
    <div className={RESERVATION_CANCELLATION_STACK_CLASS}>
      <div
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_CANCELLATION_LOCKED_CLASS}
      >
        <Text
          className={
            RESERVATION_CANCELLATION_LOCKED_TITLE_CLASS
          }
        >
          {COPY.TITLE}
        </Text>
        <Text>{COPY.BODY[status]}</Text>
        <Text>{COPY.RULE}</Text>
      </div>
      <Link
        href={PATHS.RESERVATIONS.CALENDAR}
        className={
          RESERVATION_CANCELLATION_CALENDAR_LINK_CLASS
        }
      >
        {RESERVATION_CANCELLATION_UI_COPY.BACK_TO_CALENDAR}
      </Link>
    </div>
  </ReservationCancellationLayout>
);

export default ReservationCancellationUnavailable;
