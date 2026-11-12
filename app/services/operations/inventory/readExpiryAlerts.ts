import { INVENTORY_DATA_SOURCE } from "@/app/constants";
import { throwIfSupabaseError } from "@/app/utils/supabase-error/SupabaseError";
import { INVENTORY_QUERY } from "./constants/InventoryQuery.constants";
import type { InventoryExpiryAlertDatabaseRow } from "./models/InventoryReadModels.interface";
import { requireInventoryAccess } from "./requireInventoryAccess";

export const readExpiryAlerts = async (): Promise<
  InventoryExpiryAlertDatabaseRow[]
> => {
  const supabase = await requireInventoryAccess();
  const { data, error } = await supabase
    .from(INVENTORY_DATA_SOURCE.EXPIRY_ALERTS_VIEW)
    .select(INVENTORY_DATA_SOURCE.ALL_COLUMNS_SELECT)
    .order("expiry_date", { ascending: true });

  throwIfSupabaseError(
    error,
    INVENTORY_QUERY.EXPIRY_ALERTS
  );

  return data ?? [];
};
