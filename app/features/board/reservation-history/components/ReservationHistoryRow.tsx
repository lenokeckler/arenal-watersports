import { Link, MaterialIcon, Text } from "@/app/components";
import { MATERIAL_ICON_NAME } from "@/app/components/icons/material-icon/constants/MaterialIconName.constants";
import { RESERVATION_HISTORY_STATUS } from "@/app/constants";
import type { ReservationHistoryRowProps } from "../models/ReservationHistoryRowProps.interface";
import {
  RESERVATION_HISTORY_ROW_CHEVRON_CLASS,
  RESERVATION_HISTORY_ROW_CLASS,
  RESERVATION_HISTORY_ROW_CUSTOMER_CLASS,
  RESERVATION_HISTORY_ROW_DATE_CLASS,
  RESERVATION_HISTORY_ROW_DETAILS_CLASS,
  RESERVATION_HISTORY_ROW_TOP_CLASS,
} from "../styles/ReservationHistoryRow.styles";
import { buildReservationHistoryRecordHref } from "../utils/buildReservationHistoryRecordHref";
import { formatReservationHistoryDate } from "../utils/formatReservationHistoryDate";
import ReservationHistoryCancelledMarker from "./ReservationHistoryCancelledMarker";
import ReservationHistoryRowLines from "./ReservationHistoryRowLines";

const ReservationHistoryRow = ({
  item,
  query,
}: ReservationHistoryRowProps): React.JSX.Element => (
  <Link
    href={buildReservationHistoryRecordHref(item.id, query)}
    className={RESERVATION_HISTORY_ROW_CLASS[item.status]}
  >
    <div className={RESERVATION_HISTORY_ROW_DETAILS_CLASS}>
      <div className={RESERVATION_HISTORY_ROW_TOP_CLASS}>
        <Text
          className={RESERVATION_HISTORY_ROW_DATE_CLASS}
        >
          {formatReservationHistoryDate(item.startsAt)}
        </Text>
        {item.status ===
        RESERVATION_HISTORY_STATUS.CANCELLED ? (
          <ReservationHistoryCancelledMarker />
        ) : null}
      </div>
      <Text
        className={RESERVATION_HISTORY_ROW_CUSTOMER_CLASS}
      >
        {item.customerName}
      </Text>
      <ReservationHistoryRowLines item={item} />
    </div>
    <MaterialIcon
      name={MATERIAL_ICON_NAME.CHEVRON_RIGHT}
      className={RESERVATION_HISTORY_ROW_CHEVRON_CLASS}
    />
  </Link>
);

export default ReservationHistoryRow;
