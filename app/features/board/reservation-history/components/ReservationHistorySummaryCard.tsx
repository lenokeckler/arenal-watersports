import { RESERVATION_HISTORY_STATUS } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryRecordProps } from "../models/ReservationHistoryRecordProps.interface";
import { RESERVATION_HISTORY_DETAIL_CARD_CLASS } from "../styles/ReservationHistoryDetail.styles";
import { formatReservationHistoryDateTime } from "../utils/formatReservationHistoryDateTime";
import ReservationHistoryCancelledMarker from "./ReservationHistoryCancelledMarker";
import ReservationHistoryDetailField from "./ReservationHistoryDetailField";
import ReservationHistoryDetailLines from "./ReservationHistoryDetailLines";

const ReservationHistorySummaryCard = ({
  record,
}: ReservationHistoryRecordProps): React.JSX.Element => (
  <dl className={RESERVATION_HISTORY_DETAIL_CARD_CLASS}>
    <ReservationHistoryDetailField
      label={RESERVATION_HISTORY_COPY.STATUS_LABEL}
    >
      {record.status ===
      RESERVATION_HISTORY_STATUS.CANCELLED ? (
        <ReservationHistoryCancelledMarker />
      ) : (
        RESERVATION_HISTORY_COPY.CLOSED
      )}
    </ReservationHistoryDetailField>
    <ReservationHistoryDetailField
      label={RESERVATION_HISTORY_COPY.CUSTOMER_LABEL}
    >
      {record.customerName}
    </ReservationHistoryDetailField>
    <ReservationHistoryDetailField
      label={RESERVATION_HISTORY_COPY.DATE_LABEL}
    >
      {formatReservationHistoryDateTime(record.startsAt)}
    </ReservationHistoryDetailField>
    <ReservationHistoryDetailField
      label={RESERVATION_HISTORY_COPY.EQUIPMENT_LABEL}
    >
      <ReservationHistoryDetailLines
        names={record.equipmentNames}
        fallback={RESERVATION_HISTORY_COPY.NO_EQUIPMENT}
      />
    </ReservationHistoryDetailField>
    <ReservationHistoryDetailField
      label={RESERVATION_HISTORY_COPY.GUIDE_LABEL}
    >
      <ReservationHistoryDetailLines
        names={record.guideNames}
        fallback={RESERVATION_HISTORY_COPY.NO_GUIDE}
      />
    </ReservationHistoryDetailField>
    <ReservationHistoryDetailField
      label={RESERVATION_HISTORY_COPY.ATTENDED_BY_LABEL}
    >
      {record.createdBy.name}
    </ReservationHistoryDetailField>
  </dl>
);

export default ReservationHistorySummaryCard;
