import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_CANCELLATION_FORM_COPY } from "../constants/ReservationCancellationFormCopy.constants";
import { RESERVATION_CANCELLATION_UI_COPY } from "../constants/ReservationCancellationUiCopy.constants";
import type { ReservationCancellationSuccessProps } from "../models/ReservationCancellationSuccessProps.interface";
import {
  RESERVATION_CANCELLATION_CALENDAR_LINK_CLASS,
  RESERVATION_CANCELLATION_STACK_CLASS,
} from "../styles/ReservationCancellation.styles";

const ReservationCancellationSuccess = ({
  code,
  requiresCause,
}: ReservationCancellationSuccessProps): React.JSX.Element => (
  <div className={RESERVATION_CANCELLATION_STACK_CLASS}>
    <Text role={ARIA_ROLE.STATUS}>
      {requiresCause
        ? RESERVATION_CANCELLATION_FORM_COPY.SUCCESS_DISPATCHED(
            code
          )
        : RESERVATION_CANCELLATION_FORM_COPY.SUCCESS(code)}
    </Text>
    <Link
      href={PATHS.RESERVATIONS.CALENDAR}
      className={
        RESERVATION_CANCELLATION_CALENDAR_LINK_CLASS
      }
    >
      {RESERVATION_CANCELLATION_UI_COPY.BACK_TO_CALENDAR}
    </Link>
  </div>
);

export default ReservationCancellationSuccess;
