import { PAGINATION, PATHS } from "@/app/constants";
import { INVENTORY_FILTER_PARAM } from "../constants/InventoryFilters.constants";
import type { InventoryFilters } from "../models/InventoryFilters.interface";

export const buildInventoryPagePath =
  (filters: InventoryFilters) =>
  (pageIndex: number): string => {
    const params = new URLSearchParams();

    if (filters.query) {
      params.set(
        INVENTORY_FILTER_PARAM.QUERY,
        filters.query
      );
    }

    if (filters.mode) {
      params.set(INVENTORY_FILTER_PARAM.MODE, filters.mode);
    }

    if (pageIndex > PAGINATION.DEFAULT_PAGE) {
      params.set(
        PAGINATION.QUERY_PARAMS.PAGE,
        String(pageIndex)
      );
    }

    const search = params.toString();

    return search
      ? `${PATHS.OPERATIONS.INVENTORY}?${search}`
      : PATHS.OPERATIONS.INVENTORY;
  };
