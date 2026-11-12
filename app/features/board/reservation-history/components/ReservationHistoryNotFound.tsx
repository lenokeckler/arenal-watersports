import { Text, Title } from "@/app/components";
import BackLink from "@/app/components/back-link/BackLink";
import { TitleVariant } from "@/app/components/title/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
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
  <main
    className={RESERVATION_HISTORY_PAGE_CLASS}
    aria-labelledby={
      RESERVATION_HISTORY_DOM_ID.NOT_FOUND_TITLE
    }
  >
    <div className={RESERVATION_HISTORY_EMPTY_CLASS}>
      <Title
        id={RESERVATION_HISTORY_DOM_ID.NOT_FOUND_TITLE}
        variant={TitleVariant.PRIMARY}
        text={RESERVATION_HISTORY_COPY.NOT_FOUND_TITLE}
        className={RESERVATION_HISTORY_EMPTY_TITLE_CLASS}
      />
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
