import Link from "@/app/components/link/Link";
import { MAINTENANCE_HISTORY_PAGINATION } from "../constants/MaintenanceHistory.constants";
import { MAINTENANCE_HISTORY_COPY } from "../constants/MaintenanceHistoryCopy.constants";
import type { MaintenanceHistoryPaginationProps } from "../models/MaintenanceHistoryPaginationProps.interface";
import {
  MAINTENANCE_HISTORY_PAGINATION_CLASS,
  MAINTENANCE_HISTORY_PAGINATION_LINK_CLASS,
  MAINTENANCE_HISTORY_PAGINATION_NEXT_CLASS,
} from "../styles/MaintenanceHistory.styles";
import { getHistoryPageHref } from "../utils/getHistoryPageHref";
import type { JSX } from "react";

const MaintenanceHistoryPagination = ({
  hasNextPage,
  page,
}: MaintenanceHistoryPaginationProps): JSX.Element => (
  <nav
    aria-label={MAINTENANCE_HISTORY_COPY.PAGE_LABEL}
    className={MAINTENANCE_HISTORY_PAGINATION_CLASS}
  >
    {page > MAINTENANCE_HISTORY_PAGINATION.FIRST_PAGE && (
      <Link
        className={
          MAINTENANCE_HISTORY_PAGINATION_LINK_CLASS
        }
        href={getHistoryPageHref(page - 1)}
      >
        {MAINTENANCE_HISTORY_COPY.PREVIOUS_PAGE}
      </Link>
    )}
    {hasNextPage && (
      <Link
        className={
          MAINTENANCE_HISTORY_PAGINATION_NEXT_CLASS
        }
        href={getHistoryPageHref(page + 1)}
      >
        {MAINTENANCE_HISTORY_COPY.NEXT_PAGE}
      </Link>
    )}
  </nav>
);

export default MaintenanceHistoryPagination;
