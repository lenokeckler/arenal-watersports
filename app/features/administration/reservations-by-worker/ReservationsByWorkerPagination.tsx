import { Text } from "@/app/components/text/Text";
import { RESERVATIONS_BY_WORKER_COPY } from "./constants/ReservationsByWorkerCopy.constants";
import type { NullableRef } from "@/app/types";
import type { ReservationsByWorkerPaginationProps } from "./models/ReservationsByWorkerPaginationProps.interface";
import { RESERVATIONS_BY_WORKER_PAGINATION_CLASS } from "./styles/ReservationsByWorker.styles";
import ReservationsByWorkerPageLink from "./ReservationsByWorkerPageLink";

const ReservationsByWorkerPagination = ({
  reservationsPage,
}: ReservationsByWorkerPaginationProps): NullableRef<React.JSX.Element> => {
  if (reservationsPage.pageCount <= 1) {
    return null;
  }

  const currentPage = reservationsPage.pageIndex;
  const hasPreviousPage = currentPage > 0;
  const hasNextPage =
    currentPage + 1 < reservationsPage.pageCount;

  return (
    <nav
      aria-label={RESERVATIONS_BY_WORKER_COPY.PAGINATION}
      className={RESERVATIONS_BY_WORKER_PAGINATION_CLASS}
    >
      <ReservationsByWorkerPageLink
        isEnabled={hasPreviousPage}
        label={RESERVATIONS_BY_WORKER_COPY.PREVIOUS_PAGE}
        targetPageIndex={currentPage - 1}
      />
      <Text>
        {RESERVATIONS_BY_WORKER_COPY.PAGE(
          currentPage + 1,
          reservationsPage.pageCount
        )}
      </Text>
      <ReservationsByWorkerPageLink
        isEnabled={hasNextPage}
        label={RESERVATIONS_BY_WORKER_COPY.NEXT_PAGE}
        targetPageIndex={currentPage + 1}
      />
    </nav>
  );
};

export default ReservationsByWorkerPagination;
