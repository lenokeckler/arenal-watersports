import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryRecordProps } from "../models/ReservationHistoryRecordProps.interface";
import {
  RESERVATION_HISTORY_DETAIL_CARD_CLASS,
  RESERVATION_HISTORY_DETAIL_FIELDS_CLASS,
  RESERVATION_HISTORY_DETAIL_SECTION_TITLE_CLASS,
  RESERVATION_HISTORY_DETAIL_SIGNATURE_NOTE_CLASS,
} from "../styles/ReservationHistoryDetail.styles";
import ReservationHistorySignatureEntry from "./ReservationHistorySignatureEntry";

const ReservationHistorySignatureCard = ({
  record,
}: ReservationHistoryRecordProps): React.JSX.Element => (
  <section
    className={RESERVATION_HISTORY_DETAIL_CARD_CLASS}
  >
    <Title
      variant={TitleVariant.SECONDARY}
      className={
        RESERVATION_HISTORY_DETAIL_SECTION_TITLE_CLASS
      }
      text={RESERVATION_HISTORY_COPY.SIGNATURE_TITLE}
    />
    <dl className={RESERVATION_HISTORY_DETAIL_FIELDS_CLASS}>
      <ReservationHistorySignatureEntry
        title={RESERVATION_HISTORY_COPY.CREATED_BY_LABEL}
        signature={record.createdBy}
      />
      <ReservationHistorySignatureEntry
        title={RESERVATION_HISTORY_COPY.UPDATED_BY_LABEL}
        signature={record.updatedBy}
      />
    </dl>
    <Text
      className={
        RESERVATION_HISTORY_DETAIL_SIGNATURE_NOTE_CLASS
      }
    >
      {RESERVATION_HISTORY_COPY.SIGNATURE_TIME_ZONE_NOTE}
    </Text>
  </section>
);

export default ReservationHistorySignatureCard;
