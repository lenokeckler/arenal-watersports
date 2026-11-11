import { InlineText } from "@/app/components";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_ROW_MARKER_CLASS } from "../styles/ReservationHistoryRow.styles";

const ReservationHistoryCancelledMarker =
  (): React.JSX.Element => (
    <InlineText
      className={RESERVATION_HISTORY_ROW_MARKER_CLASS}
    >
      {RESERVATION_HISTORY_COPY.CANCELLED}
    </InlineText>
  );

export default ReservationHistoryCancelledMarker;
