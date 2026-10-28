import { PAGINATION } from "./Pagination.constant";

const OPERATIONS_INVENTORY_PATH = "/operations/inventory";

export const PATHS = {
  ACCESS: {
    LOGIN: "/access/login",
    ROOT: "/access",
  },
  HOME: "/",
  OPERATIONS: {
    INVENTORY: OPERATIONS_INVENTORY_PATH,
    INVENTORY_CATEGORY: (categoryId: string) =>
      `${OPERATIONS_INVENTORY_PATH}/${encodeURIComponent(categoryId)}`,
    INVENTORY_CATEGORY_PAGE: (
      categoryId: string,
      pageIndex: number
    ) =>
      `${OPERATIONS_INVENTORY_PATH}/${encodeURIComponent(categoryId)}?${PAGINATION.QUERY_PARAMS.PAGE}=${pageIndex}`,
    INVENTORY_PAGE: (pageIndex: number) =>
      `${OPERATIONS_INVENTORY_PATH}?${PAGINATION.QUERY_PARAMS.PAGE}=${pageIndex}`,
  },
} as const;
