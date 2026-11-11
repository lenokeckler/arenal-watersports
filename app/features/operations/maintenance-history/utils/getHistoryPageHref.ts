import { PATHS } from "@/app/constants";
import {
  MAINTENANCE_HISTORY_PAGINATION,
  MAINTENANCE_HISTORY_QUERY_SEPARATOR,
} from "../constants/MaintenanceHistory.constants";

export const getHistoryPageHref = (page: number): string =>
  `${PATHS.OPERATIONS.MAINTENANCE_HISTORY}${MAINTENANCE_HISTORY_QUERY_SEPARATOR}${new URLSearchParams(
    {
      [MAINTENANCE_HISTORY_PAGINATION.QUERY_KEY]:
        String(page),
    }
  ).toString()}`;
