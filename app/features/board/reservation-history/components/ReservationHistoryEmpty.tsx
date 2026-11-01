import { Text } from "@/app/components";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import {
  RESERVATION_HISTORY_EMPTY_BODY_CLASS,
  RESERVATION_HISTORY_EMPTY_CLASS,
  RESERVATION_HISTORY_EMPTY_TITLE_CLASS,
} from "../styles/ReservationHistory.styles";

const ReservationHistoryEmpty = (): React.JSX.Element => (
  <div className={RESERVATION_HISTORY_EMPTY_CLASS}>
    <Text className={RESERVATION_HISTORY_EMPTY_TITLE_CLASS}>
      {RESERVATION_HISTORY_COPY.EMPTY_TITLE}
    </Text>
    <Text className={RESERVATION_HISTORY_EMPTY_BODY_CLASS}>
      {RESERVATION_HISTORY_COPY.EMPTY_BODY}
    </Text>
  </div>
);

export default ReservationHistoryEmpty;
