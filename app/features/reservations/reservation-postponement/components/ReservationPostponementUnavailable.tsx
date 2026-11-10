import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_POSTPONEMENT_UI_COPY } from "../constants/ReservationPostponementUiCopy.constants";
import { RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY } from "../constants/ReservationPostponementUnavailableCopy.constants";
import type { ReservationPostponementUnavailableProps } from "../models/ReservationPostponementUnavailableProps.interface";
import {
  RESERVATION_POSTPONEMENT_CALENDAR_LINK_CLASS,
  RESERVATION_POSTPONEMENT_LOCKED_ACTION_CLASS,
  RESERVATION_POSTPONEMENT_LOCKED_CLASS,
  RESERVATION_POSTPONEMENT_LOCKED_TITLE_CLASS,
} from "../styles/ReservationPostponementLayout.styles";
import { buildReservationPostponementUnavailableBody } from "../utils/buildReservationPostponementUnavailableBody";
import ReservationPostponementLayout from "./ReservationPostponementLayout";

const ReservationPostponementUnavailable = ({
  status,
}: ReservationPostponementUnavailableProps): React.JSX.Element => (
  <ReservationPostponementLayout>
    <div
      role={ARIA_ROLE.STATUS}
      className={RESERVATION_POSTPONEMENT_LOCKED_CLASS}
    >
      <Text
        className={
          RESERVATION_POSTPONEMENT_LOCKED_TITLE_CLASS
        }
      >
        {RESERVATION_POSTPONEMENT_UNAVAILABLE_COPY.TITLE}
      </Text>
      <Text>
        {buildReservationPostponementUnavailableBody(
          status
        )}
      </Text>
    </div>
    <div
      className={
        RESERVATION_POSTPONEMENT_LOCKED_ACTION_CLASS
      }
    >
      <Link
        href={PATHS.RESERVATIONS.CALENDAR}
        className={
          RESERVATION_POSTPONEMENT_CALENDAR_LINK_CLASS
        }
      >
        {RESERVATION_POSTPONEMENT_UI_COPY.BACK_TO_CALENDAR}
      </Link>
    </div>
  </ReservationPostponementLayout>
);

export default ReservationPostponementUnavailable;
