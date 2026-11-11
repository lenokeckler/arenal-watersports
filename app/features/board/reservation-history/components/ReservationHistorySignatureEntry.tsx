import { Text } from "@/app/components";
import type { ReservationHistorySignatureEntryProps } from "../models/ReservationHistorySignatureEntryProps.interface";
import {
  RESERVATION_HISTORY_DETAIL_SIGNATURE_NAME_CLASS,
  RESERVATION_HISTORY_DETAIL_SIGNATURE_TIME_CLASS,
} from "../styles/ReservationHistoryDetail.styles";
import { formatReservationHistoryDateTime } from "../utils/formatReservationHistoryDateTime";
import ReservationHistoryDetailField from "./ReservationHistoryDetailField";

const ReservationHistorySignatureEntry = ({
  signature,
  title,
}: ReservationHistorySignatureEntryProps): React.JSX.Element => (
  <ReservationHistoryDetailField label={title}>
    <Text
      className={
        RESERVATION_HISTORY_DETAIL_SIGNATURE_NAME_CLASS
      }
    >
      {signature.name}
    </Text>
    <Text
      className={
        RESERVATION_HISTORY_DETAIL_SIGNATURE_TIME_CLASS
      }
    >
      {formatReservationHistoryDateTime(signature.at)}
    </Text>
  </ReservationHistoryDetailField>
);

export default ReservationHistorySignatureEntry;
