import { LENGTH } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_VALUE_SEPARATOR } from "../constants/ReservationHistoryValueSeparator.constants";
import type { ReservationHistoryRowLinesProps } from "../models/ReservationHistoryRowLinesProps.interface";
import {
  RESERVATION_HISTORY_ROW_CLAMPED_VALUE_CLASS,
  RESERVATION_HISTORY_ROW_LINES_CLASS,
  RESERVATION_HISTORY_ROW_VALUE_CLASS,
} from "../styles/ReservationHistoryRow.styles";
import ReservationHistoryRowLine from "./ReservationHistoryRowLine";

const ReservationHistoryRowLines = ({
  item,
}: ReservationHistoryRowLinesProps): React.JSX.Element => (
  <div className={RESERVATION_HISTORY_ROW_LINES_CLASS}>
    <ReservationHistoryRowLine
      label={RESERVATION_HISTORY_COPY.EQUIPMENT_LABEL}
      value={
        item.equipmentNames.length === LENGTH.ZERO
          ? RESERVATION_HISTORY_COPY.NO_EQUIPMENT
          : item.equipmentNames.join(
              RESERVATION_HISTORY_VALUE_SEPARATOR
            )
      }
      valueClassName={
        RESERVATION_HISTORY_ROW_CLAMPED_VALUE_CLASS
      }
    />
    <ReservationHistoryRowLine
      label={RESERVATION_HISTORY_COPY.GUIDE_LABEL}
      value={
        item.guideNames.length === LENGTH.ZERO
          ? RESERVATION_HISTORY_COPY.NO_GUIDE
          : item.guideNames.join(
              RESERVATION_HISTORY_VALUE_SEPARATOR
            )
      }
      valueClassName={RESERVATION_HISTORY_ROW_VALUE_CLASS}
    />
    <ReservationHistoryRowLine
      label={RESERVATION_HISTORY_COPY.ATTENDED_BY_LABEL}
      value={item.attendedByName}
      valueClassName={RESERVATION_HISTORY_ROW_VALUE_CLASS}
    />
  </div>
);

export default ReservationHistoryRowLines;
