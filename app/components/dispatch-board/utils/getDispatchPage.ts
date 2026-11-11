import {
  DISPATCH_BOARD_MAX_PAGE,
  DISPATCH_BOARD_PAGINATION,
  DISPATCH_BOARD_PAGE_PATTERN,
} from "../constants/DispatchBoard.constants";
import type { NullableUndefined } from "@/app/types";

export const getDispatchPage = (
  page: NullableUndefined<string | string[]>
): number => {
  const parsedPage =
    typeof page === "string" &&
    DISPATCH_BOARD_PAGE_PATTERN.test(page)
      ? Number(page)
      : Number.NaN;

  return Number.isSafeInteger(parsedPage) &&
    parsedPage >= DISPATCH_BOARD_PAGINATION.FIRST_PAGE &&
    parsedPage <= DISPATCH_BOARD_MAX_PAGE
    ? parsedPage
    : DISPATCH_BOARD_PAGINATION.FIRST_PAGE;
};
