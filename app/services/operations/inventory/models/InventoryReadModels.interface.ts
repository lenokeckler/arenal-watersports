import type { Database, NullableRef } from "@/app/types";
import type { ActiveInventoryUnitStatus } from "@/app/constants";
import type { createServerSupabaseClient } from "@/app/services/supabase";
import type { InventoryStockMovementPage } from "./InventoryStockMovementPage.interface";

export type InventorySummaryDatabaseRow =
  Database["public"]["Views"]["inventory_category_summary"]["Row"];

export type InventoryExpiryAlertDatabaseRow =
  Database["public"]["Views"]["inventory_expiry_alerts"]["Row"];

export type InventoryQuantityAlertDatabaseRow =
  Database["public"]["Views"]["inventory_quantity_alerts"]["Row"];

export type InventoryUnitDatabaseRow = Pick<
  Database["public"]["Views"]["unit_current_state"]["Row"],
  "id" | "code" | "effective_status" | "recorded_status"
>;

export interface ActiveInventoryUnitDatabaseRow {
  code: string;
  effective_status: ActiveInventoryUnitStatus;
  id: string;
  recorded_status: Exclude<
    Database["public"]["Enums"]["unit_status"],
    "decommissioned"
  >;
}

export type InventorySupabaseClient = Awaited<
  ReturnType<typeof createServerSupabaseClient>
>;

export interface InventoryDataPage<TItem> {
  items: TItem[];
  pageIndex: number;
  pageCount: number;
  totalCount: number;
}

export interface InventoryCategoryDatabaseDetails {
  movements: NullableRef<InventoryStockMovementPage>;
  summary: NullableRef<InventorySummaryDatabaseRow>;
  units: InventoryDataPage<InventoryUnitDatabaseRow>;
}
