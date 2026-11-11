import { DISPATCH_BOARD_PAGINATION } from "@/app/components/dispatch-board/constants/DispatchBoard.constants";

export const E2E_DISPATCH_BOARD_SCREENSHOT_BASENAME = {
  EMPTY: "05-dispatch-board-empty",
  FIRST_PAGE: "03-dispatch-board-first-page",
  LIST: "01-dispatch-board-list",
  SECOND_PAGE: "04-dispatch-board-second-page",
  SIGN_IN_REQUIRED: "02-dispatch-board-sign-in-required",
} as const;

export const E2E_DISPATCH_RESERVATION = {
  DURATION_MINUTES: 60,
  FIRST_TIME: "00:01",
  MINUTE_MS: 60_000,
  PEOPLE_COUNT: 2,
  TYPE: "rental",
} as const;

export const E2E_DISPATCH_SEED_COUNT = {
  ONE: 1,
  OVER_ONE_PAGE: DISPATCH_BOARD_PAGINATION.PAGE_SIZE + 1,
} as const;

export const E2E_DISPATCH_PAGE = {
  BEYOND_LAST: 9999,
  SECOND: 2,
} as const;

export const E2E_DISPATCH_ERROR = {
  OPERATION_INSERT:
    "insert the E2E pending dispatch reservations",
  OPERATION_REMOVE:
    "remove the E2E pending dispatch reservations",
} as const;
