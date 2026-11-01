import { Text } from "@/app/components";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryEmptyProps } from "../models/ReservationHistoryEmptyProps.interface";
import {
  RESERVATION_HISTORY_EMPTY_BODY_CLASS,
  RESERVATION_HISTORY_EMPTY_CLASS,
  RESERVATION_HISTORY_EMPTY_TITLE_CLASS,
} from "../styles/ReservationHistory.styles";

const ReservationHistoryEmpty = ({
  isFiltered,
}: ReservationHistoryEmptyProps): React.JSX.Element => (
  <div className={RESERVATION_HISTORY_EMPTY_CLASS}>
    <Text className={RESERVATION_HISTORY_EMPTY_TITLE_CLASS}>
      {isFiltered
        ? RESERVATION_HISTORY_COPY.FILTERED_EMPTY_TITLE
        : RESERVATION_HISTORY_COPY.EMPTY_TITLE}
    </Text>
    <Text className={RESERVATION_HISTORY_EMPTY_BODY_CLASS}>
      {isFiltered
        ? RESERVATION_HISTORY_COPY.FILTERED_EMPTY_BODY
        : RESERVATION_HISTORY_COPY.EMPTY_BODY}
    </Text>
  </div>
);

export default ReservationHistoryEmpty;
