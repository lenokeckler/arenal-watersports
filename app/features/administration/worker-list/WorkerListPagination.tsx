import Link from "@/app/components/link/Link";
import Text from "@/app/components/text/Text";
import { LIST_PAGINATION_COPY } from "@/app/components/list-pagination/constants/ListPaginationCopy.constants";
import { PAGINATION, STRING } from "@/app/constants";
import type { NullableRef } from "@/app/types";
import type { WorkerListPaginationProps } from "./models/WorkerListPaginationProps.interface";
import { WORKER_LIST_COPY } from "./constants/WorkerListCopy.constants";
import {
  WORKER_LIST_PAGE_LINK_CLASS,
  WORKER_LIST_PAGINATION_CLASS,
} from "./styles/WorkerList.styles";
import { resolveWorkerListPageHref } from "./utils/resolveWorkerListPageHref";

const WorkerListPagination = ({
  pageCount,
  pageIndex,
  search,
}: WorkerListPaginationProps): NullableRef<React.JSX.Element> => {
  if (pageCount <= PAGINATION.ONE_PAGE) {
    return null;
  }

  const hasPreviousPage =
    pageIndex > PAGINATION.DEFAULT_PAGE;
  const hasNextPage =
    pageIndex + PAGINATION.ONE_PAGE < pageCount;
  const currentPage = pageIndex + PAGINATION.ONE_PAGE;

  return (
    <nav
      aria-label={WORKER_LIST_COPY.PAGINATION_NAV_LABEL}
      className={WORKER_LIST_PAGINATION_CLASS}
    >
      {hasPreviousPage && (
        <Link
          href={resolveWorkerListPageHref(
            pageIndex - PAGINATION.ONE_PAGE,
            search
          )}
          className={WORKER_LIST_PAGE_LINK_CLASS}
        >
          {LIST_PAGINATION_COPY.PREVIOUS}
        </Link>
      )}
      <Text>
        {[
          LIST_PAGINATION_COPY.PAGE,
          currentPage,
          LIST_PAGINATION_COPY.OF,
          pageCount,
        ].join(STRING.SPACE)}
      </Text>
      {hasNextPage && (
        <Link
          href={resolveWorkerListPageHref(
            pageIndex + PAGINATION.ONE_PAGE,
            search
          )}
          className={WORKER_LIST_PAGE_LINK_CLASS}
        >
          {LIST_PAGINATION_COPY.NEXT}
        </Link>
      )}
    </nav>
  );
};

export default WorkerListPagination;
