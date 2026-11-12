import {
  DISPATCH_BOARD_MAX_PAGE,
  DISPATCH_BOARD_PAGINATION,
} from "@/app/components/dispatch-board/constants/DispatchBoard.constants";
import { ERRORS } from "@/app/constants/errors/Errors.constant";

export const getPendingDispatchOffset = (
  page: number
): number => {
  if (
    !Number.isSafeInteger(page) ||
    page < DISPATCH_BOARD_PAGINATION.FIRST_PAGE ||
    page > DISPATCH_BOARD_MAX_PAGE
  ) {
    throw new RangeError(ERRORS.PAGINATION.INVALID_PAGE);
  }

  return (
    (page - DISPATCH_BOARD_PAGINATION.FIRST_PAGE) *
    DISPATCH_BOARD_PAGINATION.PAGE_SIZE
  );
};
