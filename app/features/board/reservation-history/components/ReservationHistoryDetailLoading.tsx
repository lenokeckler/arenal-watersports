import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { ARIA_ROLE } from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import {
  RESERVATION_HISTORY_PAGE_CLASS,
  RESERVATION_HISTORY_TITLE_CLASS,
} from "../styles/ReservationHistory.styles";
import { RESERVATION_HISTORY_SCREEN_READER_CLASS } from "../styles/ReservationHistoryState.styles";
import ReservationHistorySkeletonRow from "./ReservationHistorySkeletonRow";

const ReservationHistoryDetailLoading =
  (): React.JSX.Element => (
    <main
      className={RESERVATION_HISTORY_PAGE_CLASS}
      aria-busy
      aria-labelledby={
        RESERVATION_HISTORY_DOM_ID.DETAIL_TITLE
      }
    >
      <Title
        id={RESERVATION_HISTORY_DOM_ID.DETAIL_TITLE}
        variant={TitleVariant.PRIMARY}
        text={RESERVATION_HISTORY_COPY.DETAIL_TITLE}
        className={RESERVATION_HISTORY_TITLE_CLASS}
      />
      <Text
        role={ARIA_ROLE.STATUS}
        className={RESERVATION_HISTORY_SCREEN_READER_CLASS}
      >
        {
          RESERVATION_HISTORY_COPY.DETAIL_LOADING_ANNOUNCEMENT
        }
      </Text>
      <ReservationHistorySkeletonRow />
    </main>
  );

export default ReservationHistoryDetailLoading;
