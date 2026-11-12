import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryCancellationBlockProps } from "../models/ReservationHistoryCancellationBlockProps.interface";
import {
  RESERVATION_HISTORY_DETAIL_CANCELLATION_CLASS,
  RESERVATION_HISTORY_DETAIL_REASON_CLASS,
  RESERVATION_HISTORY_DETAIL_SECTION_TITLE_CLASS,
} from "../styles/ReservationHistoryDetail.styles";

const ReservationHistoryCancellationBlock = ({
  reason,
}: ReservationHistoryCancellationBlockProps): React.JSX.Element => (
  <section
    className={
      RESERVATION_HISTORY_DETAIL_CANCELLATION_CLASS
    }
  >
    <Title
      variant={TitleVariant.SECONDARY}
      className={
        RESERVATION_HISTORY_DETAIL_SECTION_TITLE_CLASS
      }
      text={
        RESERVATION_HISTORY_COPY.CANCELLATION_REASON_TITLE
      }
    />
    <Text
      className={RESERVATION_HISTORY_DETAIL_REASON_CLASS}
    >
      {reason ??
        RESERVATION_HISTORY_COPY.NO_CANCELLATION_REASON}
    </Text>
  </section>
);

export default ReservationHistoryCancellationBlock;
