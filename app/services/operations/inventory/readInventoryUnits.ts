import {
  INVENTORY_DATA_SOURCE,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import type {
  InventoryDataPage,
  InventorySupabaseClient,
  InventoryUnitDatabaseRow,
} from "./models/InventoryReadModels.interface";
import { INVENTORY_QUERY } from "./constants/InventoryQuery.constants";
import { resolveInventoryQueryPage } from "./utils/resolveInventoryQueryPage";
import { resolveInventoryPageRange } from "./utils/inventoryPagination";

export const readInventoryUnitPage = async (
  supabase: InventorySupabaseClient,
  categoryId: string,
  pageIndex: number
): Promise<InventoryDataPage<InventoryUnitDatabaseRow>> => {
  const readPage = (requestedPageIndex: number) => {
    const { from, to } = resolveInventoryPageRange(
      requestedPageIndex
    );

    return supabase
      .from(INVENTORY_DATA_SOURCE.UNIT_CURRENT_STATE_VIEW)
      .select(INVENTORY_DATA_SOURCE.UNIT_DETAILS_SELECT, {
        count: "exact",
      })
      .eq(
        INVENTORY_DATA_SOURCE.CATEGORY_ID_COLUMN,
        categoryId
      )
      .neq(
        INVENTORY_DATA_SOURCE.RECORDED_STATUS_COLUMN,
        INVENTORY_UNIT_STATUS.DECOMMISSIONED
      )
      .order(INVENTORY_DATA_SOURCE.UNIT_CODE_COLUMN, {
        ascending: true,
      })
      .range(from, to);
  };

  return resolveInventoryQueryPage(
    await readPage(pageIndex),
    pageIndex,
    INVENTORY_QUERY.UNITS,
    readPage
  );
};
