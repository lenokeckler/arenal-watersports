import { Text } from "@/app/components";
import BackLink from "@/app/components/back-link/BackLink";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import type { ReservationHistoryBackHrefProps } from "../models/ReservationHistoryBackHrefProps.interface";
import {
  RESERVATION_HISTORY_EMPTY_BODY_CLASS,
  RESERVATION_HISTORY_EMPTY_CLASS,
  RESERVATION_HISTORY_EMPTY_TITLE_CLASS,
  RESERVATION_HISTORY_PAGE_CLASS,
} from "../styles/ReservationHistory.styles";

const ReservationHistoryNotFound = ({
  backHref,
}: ReservationHistoryBackHrefProps): React.JSX.Element => (
  <main className={RESERVATION_HISTORY_PAGE_CLASS}>
    <div className={RESERVATION_HISTORY_EMPTY_CLASS}>
      <Text
        className={RESERVATION_HISTORY_EMPTY_TITLE_CLASS}
      >
        {RESERVATION_HISTORY_COPY.NOT_FOUND_TITLE}
      </Text>
      <Text
        className={RESERVATION_HISTORY_EMPTY_BODY_CLASS}
      >
        {RESERVATION_HISTORY_COPY.NOT_FOUND_BODY}
      </Text>
    </div>
    <BackLink
      href={backHref}
      label={RESERVATION_HISTORY_COPY.BACK_TO_HISTORY}
    />
  </main>
);

export default ReservationHistoryNotFound;
