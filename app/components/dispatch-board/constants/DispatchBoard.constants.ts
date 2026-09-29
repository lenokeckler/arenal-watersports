export const OPERATIONS_AREA = "operaciones";

export const DISPATCH_BOARD_PAGINATION = {
  FIRST_PAGE: 1,
  MAX_OFFSET: 2_147_483_647,
  PAGE_SIZE: 50,
} as const;

export const DISPATCH_BOARD_MAX_PAGE =
  Math.floor(
    DISPATCH_BOARD_PAGINATION.MAX_OFFSET /
      DISPATCH_BOARD_PAGINATION.PAGE_SIZE
  ) + DISPATCH_BOARD_PAGINATION.FIRST_PAGE;

export const OPERATIONS_ACCESS_ERROR =
  "The current worker cannot access operations.";
