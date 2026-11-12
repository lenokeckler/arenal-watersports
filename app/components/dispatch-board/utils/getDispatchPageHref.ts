import { PATHS } from "@/app/constants";
import {
  DISPATCH_BOARD_PAGINATION,
  DISPATCH_BOARD_QUERY,
} from "../constants/DispatchBoard.constants";

export const getDispatchPageHref = (
  page: number
): string => {
  const query = new URLSearchParams({
    [DISPATCH_BOARD_PAGINATION.QUERY_KEY]: String(page),
  });

  return `${PATHS.OPERATIONS.PENDING_DISPATCHES}${DISPATCH_BOARD_QUERY.SEPARATOR}${query.toString()}`;
};
