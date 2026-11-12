import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_QUERY } from "./constants/InventoryQuery.constants";
import type { InventoryQuantityAlertDatabaseRow } from "./models/InventoryReadModels.interface";
import { requireInventoryAccess } from "./requireInventoryAccess";

export const readQuantityAlerts = async (): Promise<
  InventoryQuantityAlertDatabaseRow[]
> => {
  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase
    .from(INVENTORY_DATA_SOURCE.QUANTITY_ALERTS_VIEW)
    .select(INVENTORY_DATA_SOURCE.ALL_COLUMNS_SELECT)
    .order(INVENTORY_DATA_SOURCE.CATEGORY_NAME_COLUMN, {
      ascending: true,
    });

  throwIfSupabaseError(
    error,
    INVENTORY_QUERY.QUANTITY_ALERTS
  );

  return data ?? [];
};
