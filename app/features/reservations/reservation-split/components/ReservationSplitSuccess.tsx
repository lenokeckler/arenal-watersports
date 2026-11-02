import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_SPLIT_DRAFT } from "../constants/ReservationSplitDraft.constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import type { ReservationSplitSuccessProps } from "../models/ReservationSplitSuccessProps.interface";
import {
  RESERVATION_SPLIT_SUCCESS_CLASS,
  RESERVATION_SPLIT_CALENDAR_LINK_CLASS,
  RESERVATION_SPLIT_SUCCESS_LIST_CLASS,
} from "../styles/ReservationSplitLayout.styles";

const ReservationSplitSuccess = ({
  createdDepartures,
}: ReservationSplitSuccessProps): React.JSX.Element => (
  <div className={RESERVATION_SPLIT_SUCCESS_CLASS}>
    <Text role={ARIA_ROLE.STATUS}>
      {RESERVATION_SPLIT_UI_COPY.SUCCESS(
        createdDepartures.length +
          RESERVATION_SPLIT_DRAFT.ORIGINAL_DEPARTURES
      )}
    </Text>
    <ul className={RESERVATION_SPLIT_SUCCESS_LIST_CLASS}>
      {createdDepartures.map(({ code, reservationId }) => (
        <li key={reservationId}>{code}</li>
      ))}
    </ul>
    <Link
      href={PATHS.RESERVATIONS.CALENDAR}
      className={RESERVATION_SPLIT_CALENDAR_LINK_CLASS}
    >
      {RESERVATION_SPLIT_UI_COPY.BACK_TO_CALENDAR}
    </Link>
  </div>
);

export default ReservationSplitSuccess;
