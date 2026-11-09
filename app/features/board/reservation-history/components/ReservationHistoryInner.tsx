import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import type { ReservationHistoryInnerProps } from "../models/ReservationHistoryInnerProps.interface";
import { RESERVATION_HISTORY_PAGE_CLASS } from "../styles/ReservationHistory.styles";
import ReservationHistoryFilters from "./ReservationHistoryFilters";
import ReservationHistoryHeader from "./ReservationHistoryHeader";
import ReservationHistoryPagination from "./ReservationHistoryPagination";
import ReservationHistoryResults from "./ReservationHistoryResults";

const ReservationHistoryInner = ({
  categoryOptions,
  hasInvertedDateRange,
  page,
  query,
}: ReservationHistoryInnerProps): React.JSX.Element => (
  <main
    className={RESERVATION_HISTORY_PAGE_CLASS}
    aria-labelledby={RESERVATION_HISTORY_DOM_ID.TITLE}
  >
    <ReservationHistoryHeader />
    <ReservationHistoryFilters
      categoryOptions={categoryOptions}
      filters={query.filters}
      hasInvertedDateRange={hasInvertedDateRange}
    />
    {!hasInvertedDateRange && (
      <>
        <ReservationHistoryResults
          items={page.items}
          query={query}
        />
        <ReservationHistoryPagination
          page={page}
          query={query}
        />
      </>
    )}
  </main>
);

export default ReservationHistoryInner;
