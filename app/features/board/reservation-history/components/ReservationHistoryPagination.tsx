import { Text } from "@/app/components";
import { PAGINATION, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import { RESERVATION_HISTORY_COPY } from "../constants/ReservationHistoryCopy.constants";
import { RESERVATION_HISTORY_PAGINATION } from "../constants/ReservationHistoryPagination.constants";
import type { ReservationHistoryPaginationProps } from "../models/ReservationHistoryPaginationProps.interface";
import {
  RESERVATION_HISTORY_PAGINATION_CLASS,
  RESERVATION_HISTORY_PAGINATION_STATUS_CLASS,
} from "../styles/ReservationHistoryPagination.styles";
import { buildReservationHistoryHref } from "../utils/buildReservationHistoryHref";
import ReservationHistoryPageLink from "./ReservationHistoryPageLink";

const ReservationHistoryPagination = ({
  page,
  query,
}: ReservationHistoryPaginationProps): NullableRef<React.JSX.Element> => {
  if (page.pageCount <= PAGINATION.ONE_PAGE) {
    return null;
  }

  const pageNumber =
    page.pageIndex +
    RESERVATION_HISTORY_PAGINATION.PAGE_NUMBER_OFFSET;

  return (
    <nav
      aria-label={
        RESERVATION_HISTORY_COPY.PAGINATION_NAV_LABEL
      }
      className={RESERVATION_HISTORY_PAGINATION_CLASS}
    >
      <ReservationHistoryPageLink
        isEnabled={page.pageIndex > PAGINATION.DEFAULT_PAGE}
        label={RESERVATION_HISTORY_COPY.PAGINATION_PREVIOUS}
        href={buildReservationHistoryHref({
          filters: query.filters,
          pageIndex: page.pageIndex - PAGINATION.ONE_PAGE,
        })}
      />
      <Text
        className={
          RESERVATION_HISTORY_PAGINATION_STATUS_CLASS
        }
      >
        {[
          RESERVATION_HISTORY_COPY.PAGINATION_PAGE,
          pageNumber,
          RESERVATION_HISTORY_COPY.PAGINATION_OF,
          page.pageCount,
        ].join(STRING.SPACE)}
      </Text>
      <ReservationHistoryPageLink
        isEnabled={
          page.pageIndex + PAGINATION.ONE_PAGE <
          page.pageCount
        }
        label={RESERVATION_HISTORY_COPY.PAGINATION_NEXT}
        href={buildReservationHistoryHref({
          filters: query.filters,
          pageIndex: page.pageIndex + PAGINATION.ONE_PAGE,
        })}
      />
    </nav>
  );
};

export default ReservationHistoryPagination;
