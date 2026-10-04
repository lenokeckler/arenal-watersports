import {
  INVENTORY_DATA_SOURCE,
  INVENTORY_TRACKING_MODE,
  INVENTORY_UNIT_STATUS,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_QUERY } from "./constants/InventoryQuery.constants";
import type {
  InventoryCategoryDatabaseDetails,
  InventoryDataPage,
  InventorySummaryDatabaseRow,
  InventorySupabaseClient,
  InventoryUnitDatabaseRow,
} from "./models/InventoryReadModels.interface";
import { requireInventoryAccess } from "./requireInventoryAccess";
import {
  createEmptyInventoryUnitPage,
  createInventoryDataPage,
  resolveInventoryPageRange,
} from "./utils/inventoryPagination";

const readUnitPage = async (
  supabase: InventorySupabaseClient,
  categoryId: string,
  pageIndex: number
): Promise<InventoryDataPage<InventoryUnitDatabaseRow>> => {
  const { from, to } = resolveInventoryPageRange(pageIndex);
  const { data, error, count } = await supabase
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

  throwIfSupabaseError(error, INVENTORY_QUERY.UNITS);

  return createInventoryDataPage(
    data ?? [],
    count,
    pageIndex
  );
};

export const getInventorySummaryPage = async (
  pageIndex: number
): Promise<
  InventoryDataPage<InventorySummaryDatabaseRow>
> => {
  const supabase = await requireInventoryAccess();
  const { from, to } = resolveInventoryPageRange(pageIndex);
  const { data, error, count } = await supabase
    .from(INVENTORY_DATA_SOURCE.CATEGORY_SUMMARY_VIEW)
    .select(INVENTORY_DATA_SOURCE.ALL_COLUMNS_SELECT, {
      count: "exact",
    })
    .order(INVENTORY_DATA_SOURCE.CATEGORY_NAME_COLUMN, {
      ascending: true,
    })
    .range(from, to);

  throwIfSupabaseError(
    error,
    INVENTORY_QUERY.CATEGORY_SUMMARIES
  );

  return createInventoryDataPage(
    data ?? [],
    count,
    pageIndex
  );
};

export const getInventoryCategoryDetails = async (
  categoryId: string,
  pageIndex: number
): Promise<InventoryCategoryDatabaseDetails> => {
  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase
    .from(INVENTORY_DATA_SOURCE.CATEGORY_SUMMARY_VIEW)
    .select(INVENTORY_DATA_SOURCE.ALL_COLUMNS_SELECT)
    .eq(
      INVENTORY_DATA_SOURCE.CATEGORY_ID_COLUMN,
      categoryId
    )
    .maybeSingle();

  throwIfSupabaseError(
    error,
    INVENTORY_QUERY.CATEGORY_DETAILS
  );

  if (!data) {
    return {
      summary: null,
      units: createEmptyInventoryUnitPage(pageIndex),
    };
  }

  if (
    data.tracking_mode !== INVENTORY_TRACKING_MODE.BY_UNIT
  ) {
    return {
      summary: data,
      units: createEmptyInventoryUnitPage(pageIndex),
    };
  }

  const units = await readUnitPage(
    supabase,
    categoryId,
    pageIndex
  );

  return { summary: data, units };
};
