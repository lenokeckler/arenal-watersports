import { Link, Text } from "@/app/components";
import { ARIA_ROLE, PATHS } from "@/app/constants";
import { RESERVATION_SPLIT_UI_COPY } from "../constants/ReservationSplitUiCopy.constants";
import { RESERVATION_SPLIT_UNAVAILABLE_COPY } from "../constants/ReservationSplitUnavailableCopy.constants";
import type { ReservationSplitUnavailableProps } from "../models/ReservationSplitUnavailableProps.interface";
import {
  RESERVATION_SPLIT_CALENDAR_LINK_CLASS,
  RESERVATION_SPLIT_LOCKED_ACTION_CLASS,
  RESERVATION_SPLIT_LOCKED_CLASS,
  RESERVATION_SPLIT_LOCKED_TITLE_CLASS,
} from "../styles/ReservationSplitLayout.styles";
import ReservationSplitLayout from "./ReservationSplitLayout";

const ReservationSplitUnavailable = ({
  reason,
}: ReservationSplitUnavailableProps): React.JSX.Element => {
  const copy = RESERVATION_SPLIT_UNAVAILABLE_COPY[reason];

  return (
    <ReservationSplitLayout>
      <div
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_SPLIT_LOCKED_CLASS}
      >
        <Text
          className={RESERVATION_SPLIT_LOCKED_TITLE_CLASS}
        >
          {copy.title}
        </Text>
        <Text>{copy.body}</Text>
      </div>
      <div
        className={RESERVATION_SPLIT_LOCKED_ACTION_CLASS}
      >
        <Link
          href={PATHS.RESERVATIONS.CALENDAR}
          className={RESERVATION_SPLIT_CALENDAR_LINK_CLASS}
        >
          {RESERVATION_SPLIT_UI_COPY.BACK_TO_CALENDAR}
        </Link>
      </div>
    </ReservationSplitLayout>
  );
};

export default ReservationSplitUnavailable;
