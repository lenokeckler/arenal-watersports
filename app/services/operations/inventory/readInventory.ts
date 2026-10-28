import {
  UUID_PATTERN,
  INVENTORY_DATA_SOURCE,
  INVENTORY_TRACKING_MODE,
} from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_QUERY } from "./constants/InventoryQuery.constants";
import type {
  InventoryCategoryDatabaseDetails,
  InventoryDataPage,
  InventorySummaryDatabaseRow,
} from "./models/InventoryReadModels.interface";
import { requireInventoryAccess } from "./requireInventoryAccess";
import { readInventoryUnitPage } from "./readInventoryUnits";
import { resolveInventoryQueryPage } from "./utils/resolveInventoryQueryPage";
import {
  createEmptyInventoryUnitPage,
  normalizeInventoryPageIndex,
  resolveInventoryPageRange,
} from "./utils/inventoryPagination";

export const getInventorySummaryPage = async (
  pageIndex: number
): Promise<
  InventoryDataPage<InventorySummaryDatabaseRow>
> => {
  const supabase = await requireInventoryAccess();
  const normalizedPageIndex =
    normalizeInventoryPageIndex(pageIndex);
  const readPage = (requestedPageIndex: number) => {
    const { from, to } = resolveInventoryPageRange(
      requestedPageIndex
    );

    return supabase
      .from(INVENTORY_DATA_SOURCE.CATEGORY_SUMMARY_VIEW)
      .select(INVENTORY_DATA_SOURCE.ALL_COLUMNS_SELECT, {
        count: "exact",
      })
      .order(INVENTORY_DATA_SOURCE.CATEGORY_NAME_COLUMN, {
        ascending: true,
      })
      .range(from, to);
  };

  return resolveInventoryQueryPage(
    await readPage(normalizedPageIndex),
    normalizedPageIndex,
    INVENTORY_QUERY.CATEGORY_SUMMARIES,
    readPage
  );
};

export const getInventoryCategoryDetails = async (
  categoryId: string,
  pageIndex: number
): Promise<InventoryCategoryDatabaseDetails> => {
  const supabase = await requireInventoryAccess();
  const normalizedPageIndex =
    normalizeInventoryPageIndex(pageIndex);

  if (!UUID_PATTERN.test(categoryId)) {
    return {
      summary: null,
      units: createEmptyInventoryUnitPage(
        normalizedPageIndex
      ),
    };
  }

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
      units: createEmptyInventoryUnitPage(
        normalizedPageIndex
      ),
    };
  }

  if (
    data.tracking_mode !== INVENTORY_TRACKING_MODE.BY_UNIT
  ) {
    return {
      summary: data,
      units: createEmptyInventoryUnitPage(
        normalizedPageIndex
      ),
    };
  }

  const units = await readInventoryUnitPage(
    supabase,
    categoryId,
    normalizedPageIndex
  );

  return { summary: data, units };
};
