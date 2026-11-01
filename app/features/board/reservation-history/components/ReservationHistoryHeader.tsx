import { Text, Title } from "@/app/components";
import { TitleVariant } from "@/app/components/title/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import {
  RESERVATION_HISTORY_DESCRIPTION_CLASS,
  RESERVATION_HISTORY_HEADER_CLASS,
  RESERVATION_HISTORY_TITLE_CLASS,
} from "../styles/ReservationHistory.styles";

const ReservationHistoryHeader = (): React.JSX.Element => (
  <header className={RESERVATION_HISTORY_HEADER_CLASS}>
    <Title
      id={RESERVATION_HISTORY_DOM_ID.TITLE}
      variant={TitleVariant.PRIMARY}
      text={RESERVATION_HISTORY_COPY.PAGE_TITLE}
      className={RESERVATION_HISTORY_TITLE_CLASS}
    />
    <Text className={RESERVATION_HISTORY_DESCRIPTION_CLASS}>
      {RESERVATION_HISTORY_COPY.PAGE_DESCRIPTION}
    </Text>
  </header>
);

export default ReservationHistoryHeader;
