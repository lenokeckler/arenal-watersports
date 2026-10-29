import {
  INVENTORY_DATA_SOURCE,
  UUID_PATTERN,
} from "@/app/constants";
import type { InventorySummaryDatabaseRow } from "@/app/services/operations/inventory/models/InventoryReadModels.interface";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { E2E_SYSTEM_ROUTE_READ } from "../constants/E2eSystemRoute.constants";
import { createServiceRoleClient } from "./createServiceRoleClient";

export const readSeededInventoryCategoryId =
  async (): Promise<string> => {
    const supabase = createServiceRoleClient();
    const { data, error } = await supabase
      .from(INVENTORY_DATA_SOURCE.CATEGORY_SUMMARY_VIEW)
      .select(INVENTORY_DATA_SOURCE.ALL_COLUMNS_SELECT)
      .order(INVENTORY_DATA_SOURCE.CATEGORY_NAME_COLUMN)
      .limit(E2E_SYSTEM_ROUTE_READ.ROW_LIMIT)
      .maybeSingle<InventorySummaryDatabaseRow>();

    throwIfSupabaseError(
      error,
      E2E_SYSTEM_ROUTE_READ.OPERATION
    );

    if (
      !data?.category_id ||
      !UUID_PATTERN.test(data.category_id)
    ) {
      throw new Error(
        E2E_SYSTEM_ROUTE_READ.MISSING_CATEGORY
      );
    }

    return data.category_id;
  };
