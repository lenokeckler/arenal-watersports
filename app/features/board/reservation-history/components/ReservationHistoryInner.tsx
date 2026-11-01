import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import type { ReservationHistoryInnerProps } from "../models/ReservationHistoryInnerProps.interface";
import { RESERVATION_HISTORY_PAGE_CLASS } from "../styles/ReservationHistory.styles";
import ReservationHistoryPagination from "./ReservationHistoryPagination";
import ReservationHistoryHeader from "./ReservationHistoryHeader";
import ReservationHistoryResults from "./ReservationHistoryResults";

const ReservationHistoryInner = ({
  page,
  query,
}: ReservationHistoryInnerProps): React.JSX.Element => (
  <main
    className={RESERVATION_HISTORY_PAGE_CLASS}
    aria-labelledby={RESERVATION_HISTORY_DOM_ID.TITLE}
  >
    <ReservationHistoryHeader />
    <ReservationHistoryResults
      items={page.items}
      query={query}
    />
    <ReservationHistoryPagination
      page={page}
      query={query}
    />
  </main>
);

export default ReservationHistoryInner;
