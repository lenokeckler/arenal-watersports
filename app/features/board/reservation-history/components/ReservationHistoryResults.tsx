import { UnorderedList } from "@/app/components";
import {
  ARIA_ROLE,
  LENGTH,
  UNORDERED_LIST,
} from "@/app/constants";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_DOM_ID } from "../constants/ReservationHistoryDomId.constants";
import type { ReservationHistoryResultsProps } from "../models/ReservationHistoryResultsProps.interface";
import { RESERVATION_HISTORY_LIST_CLASS } from "../styles/ReservationHistory.styles";
import { hasReservationHistoryFilters } from "../utils/hasReservationHistoryFilters";
import ReservationHistoryEmpty from "./ReservationHistoryEmpty";
import ReservationHistoryRow from "./ReservationHistoryRow";

const ReservationHistoryResults = ({
  items,
  query,
}: ReservationHistoryResultsProps): React.JSX.Element =>
  items.length === LENGTH.ZERO ? (
    <ReservationHistoryEmpty
      isFiltered={hasReservationHistoryFilters(
        query.filters
      )}
    />
  ) : (
    <UnorderedList
      id={RESERVATION_HISTORY_DOM_ID.RESULTS}
      role={ARIA_ROLE.LIST}
      variant={UNORDERED_LIST.VARIANTS.PLAIN}
      ariaLabel={RESERVATION_HISTORY_COPY.LIST_ARIA_LABEL}
      className={RESERVATION_HISTORY_LIST_CLASS}
      items={items.map((item) => ({
        id: item.id,
        text: (
          <ReservationHistoryRow
            item={item}
            query={query}
          />
        ),
      }))}
    />
  );

export default ReservationHistoryResults;
